export class AddEventConstants {
  public static readonly constants = {
    cowId: "2927791",
    remarkText: ["Test remark 1", "Test remark 2"],
    eventText: ["Test event 1", "Test event 2"],
    topEventFromPulldown: "Aborted",
    testEvent: "Corona (virus)",
    eventGroup: "2000",
    savedSuccess: "Successfully saved",
    deletedSuccess: "Successfully deleted",
  };

  public static readonly dataTestId = {};

  public static readonly locators = {
    dropdownContainer: ".dropdown-container",
    modalTitle: ".modal-title",
    modalContent: ".modal-content",
    inputEvent: "#input-event-description",
    editIcon: 'div[role="gridcell"][col-id="EditRow"] .iconEdit',
    trashIcon: 'div[role="gridcell"][col-id="DeleteRow"] .iconTrash',
    addEventRemarkInput: "#remarkInput",
  };
}
