export class MyCMInvoicesConstants {
  public static readonly constants = {
    infoAlertOne:
      "If the ‘Pay’ button is not available for an unpaid invoice please use the payment details on the invoice, or the link in your email.",
    infoAlertTwo:
      "Payments have to be processed by CowManager. The invoice status will be changed when this process has been completed.",
    infoAlertThree:
      "Automatic payments are only set up for subscription invoices, hardware invoices will need to be paid manually.",
    toolTipAutopayments:
      "Automatic payments are active. Invoices that were sent before automatic payments was set up, must be paid manually.",
    infoIconAutopayments:
      "Automatic payments are only set up for subscription invoices, hardware invoices will need to be paid manually",
  };

  public static readonly dataTestId = {
    invoicesPage: "mycm-menu-invoices",
    invoicesPageTitle: "page_title_invoices",
    invoicesTable: "invoices_table_id",
    statusColumn: "invoiceTableColumnStatus",
    issuedColumn: "invoiceTableColumnIssued",
    dueDateColumn: "invoiceTableColumnDueDate",
    totalValueColumn: "invoiceTableColumnTotalValue",
  };

  public static readonly dataTest = {
    infoAlertButton: "CmAlert-toggle",
    invoicesInfoIcon: "CmPopover-anchor",
  };

  public static readonly locators = {
    outstandingTabCount: "div[data-test='CmTab-tab-badge']",
    invoiceRecordCount: '[data-testid*="invoice-row-"]',
  };

  public static readonly apiEndpoints = {
    getInvoiceApiURL:
      "https://api.test-cowmanager.com/mycowmanager/v1/invoice/1",
  };
}
