import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TicketSystem {
    private Configuration configuration;
    private TicketPool ticketPool;
    private List<Thread> vendorThreads;
    private List<Thread> customerThreads;

    public static void main(String[] args) {
        TicketSystem ticketSystem = new TicketSystem();
        ticketSystem.run();
    }

    public void run() {

        System.out.println("Use the following commands to interact with the system:");
        System.out.println("Commands: start, stop");

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("> ");
            String command = scanner.nextLine().trim().toLowerCase();

            switch (command) {
                case "start":
                    initialize();
                    startOperation();
                    break;
                case "stop":
                    stopOperation();
                    System.out.println("Exiting the system. Goodbye!");
                    return;
                default:
                    System.out.println("Invalid command. Please try again.");
            }
        }
    }

    public void initialize() {
        // Step 1: Setup Configuration
        if (configuration == null) {
            configuration = new Configuration();
            configuration.configureSystem();
        } else {
            System.out.println("System already initialized.");
            return;
        }

        // Step 2: Initialize Ticket Pool
        ticketPool = new TicketPool(configuration.getMaxTicketCapacity(), new Logger("ticket_transactions.log"));

        // Step 3: Predefine Vendors and Customers
        int predefinedVendorCount = 2; // Number of Vendors
        int predefinedCustomerCount = 3; // Number of Customers

        // Initialize vendor and customer thread lists
        vendorThreads = new ArrayList<>();
        customerThreads = new ArrayList<>();

        // Create Vendor Threads
        for (int i = 0; i < predefinedVendorCount; i++) {
            Vendor vendor = new Vendor(ticketPool, configuration.getTicketReleaseRate());
            Thread vendorThread = new Thread(vendor, "Vendor-" + (i + 1));
            vendorThreads.add(vendorThread);
        }

        // Create Customer Threads
        for (int i = 0; i < predefinedCustomerCount; i++) {
            Customer customer = new Customer(ticketPool, configuration.getCustomerRetrievalRate());
            Thread customerThread = new Thread(customer, "Customer-" + (i + 1));
            customerThreads.add(customerThread);
        }

        System.out.println("Ticket system initialized with " + predefinedVendorCount + " Vendors and " + predefinedCustomerCount + " Customers!");
    }


    private void startOperation() {
        System.out.println("\nStarting ticketing system...");

        // Start all Vendor Threads
        for (Thread vendorThread : vendorThreads) {
            vendorThread.start();
        }

        // Start all Customer Threads
        for (Thread customerThread : customerThreads) {
            customerThread.start();
        }

        // Wait for all threads to complete
        try {
            for (Thread vendorThread : vendorThreads) {
                vendorThread.join();
            }
            for (Thread customerThread : customerThreads) {
                customerThread.join();
            }
        } catch (InterruptedException e) {
            System.out.println("Ticket system interrupted: " + e.getMessage());
        }
    }

    private void stopOperation() {
        // Stop vendor threads if initialized
        if (vendorThreads != null) {
            for (Thread vendorThread : vendorThreads) {
                if (vendorThread.isAlive()) {
                    vendorThread.interrupt();
                    System.out.println(vendorThread.getName() + " operation stopped.");
                }
            }
        }

        // Stop customer threads if initialized
        if (customerThreads != null) {
            for (Thread customerThread : customerThreads) {
                if (customerThread.isAlive()) {
                    customerThread.interrupt();
                    System.out.println(customerThread.getName() + " operation stopped.");
                }
            }
        }
    }


}
