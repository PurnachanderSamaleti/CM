export class MyCMOverviewConstants {
  public static readonly constants = {
    autoPaymentsSetToTrueToaster:
      "Automatic payment is active, but only for subscription invoices. No action is required for invoices that were sent after automatic payment was set up.",
  };

  public static readonly dataTestId = {
    overviewPage: "my-cowmanager-welcome-banner",
    invoicesAccordion: "overview_invoice_card",
    ordersAccordion: "overview_orders_card",
    productsAccordion: "overview_products_card",
    overviewButton: "mycm-menu-overview",
  };

  public static readonly dataTest = {
    allCardsFooterButton: "overview-page-all-cards-footer-button",
  };

  public static readonly apiEndpoints = {
    getOverviewApiURL:
      "https://api.test-cowmanager.com/mycowmanager/v1/overview",
  };
}
