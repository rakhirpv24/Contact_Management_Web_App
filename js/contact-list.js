/**
Utilities for Contact List.
*/

var users = [
	{firstName: "Barack", lastName: "Obama", email: "obama@sjsu.edu", cell: "(408)555-1234", photo: "images/obama.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Barack2", lastName: "Obama2", email: "obama2@sjsu.edu", cell: "(408)555-1234", photo: "images/obama2.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron", lastName: "Mak", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron2", lastName: "Mak2", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron3", lastName: "Mak3", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron4", lastName: "Mak4", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron5", lastName: "Mak5", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "Ron654321", lastName: "Mak654321", email: "ron.mak@sjsu.edu", cell: "(408)555-1234", photo: "images/ron.jpg", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"
	}];

var groups = [
	{name: "Friends", photo: "images/obama2.jpg"},
	{name: "Coworkers", photo: "images/ron.jpg"},
	{name: "Important", photo: "images/obama.jpg"}
];

// Default contact info.
var contactDefault = {firstName: "", lastName: "", email: "", cell: "", photo: "no-image.png", birthdate: "1/1/2015",homeAddress: "", workAddress: ""};
// Default group info.
var groupDefault = {name: "", photo: ""};

/**
Utilities for use with the contact list.
e.g. contactUtilities.makeContactListItem()
*/
var contactUtilities = new function() {
	this.makeListItemString;
	this.makeListGridItemString;
	this.makeContactListItem;

	/* Refreshes the list of contacts with the specfied list of contacts. */
	this.refreshContactList = function(contacts) {
		var contactListContainer = jQuery('#contact-list-container');
		var contactList = jQuery('<ol class="contact-list"></ol>');
		contactListContainer.empty();
		contactListContainer.append(contactList);
		for (var i = 0; i < contacts.length; i++) {
			var contact = contacts[i];
			this.addContactToList(contactList, contact);
		}
	}
	
	/* Show contact panel full, and other panels are deactivated. */
	this.showContactPanelFullOnly = function() {
		this.showContactPanelFull();
		this.hideGroupList();
		// Make contact panel full size and hide contact viewer and editor.
		this.hideContactViewer();
		this.hideContactEditor();
		this.hideContactAdder();
	}
	
	/* Show contact list. */
	this.showContactPanelFull = function() {
		jQuery('#contact-panel').removeClass("contact-panel-inactive");
		
	}
	/* Hide contact list. */
	this.hideContactPanel = function() {
		jQuery('#contact-panel').addClass("contact-panel-inactive");
	}
	/* Show grouplist and hide contact panel. */
	this.showGroupListOnly = function() {
		this.showGroupList();
		this.hideContactPanel();
		this.hideContactViewer();
		this.hideContactEditor();
		this.hideContactAdder();
	}
	/* Show group list. */
	this.showGroupList = function() {
		jQuery('#group-list').removeClass("group-list-inactive");
	}
	/* HIde group list. */
	this.hideGroupList = function() {
		jQuery('#group-list').addClass("group-list-inactive");
	}
	
	
	
	/* View the contact with the specified info. */
	this.showContactViewer = function(contactInfo) {
		jQuery('#contact-viewer').removeClass("contact-viewer-inactive");
		// Remove old contact info from the viewer. FIXME: In a real version, you would probably use jQuery to overwrite on the DOM elements the values instead.
		jQuery('#contact-viewer').empty();
		// Show contact info.
		jQuery('#contact-viewer').append(this.makeContactDisplay(contactInfo));
		// Make contact panel thinner.
		jQuery('#contact-panel').addClass("contact-panel-thin");
	};
	
	this.hideContactViewer = function() {
		jQuery('#contact-viewer').addClass("contact-viewer-inactive");
		// Make contact panel full size.
		jQuery('#contact-panel').removeClass("contact-panel-thin");
	};
	
	/* Makes a display of the specified cotnact. */
	this.makeContactDisplay = function(contactInfo) {
		var container;
		var editButton;
		var panel;
		// Make the button for editing the contact.
		editButton = jQuery('<button id="contact-view-editbutton">edit contact</button>');
		// When the edit button is clicked, show the edit screen.
		editButton.click(function(self) {
			return function() {
				self.showContactEditor(contactInfo);
			};
		}(this));
		// Make the main panel.
		panel = jQuery(this.makeContactDisplayPanelString(contactInfo));
		// Put everything into a container.
		container = jQuery('<div></div>');
		container.append(editButton);
		container.append(panel);
		return container;
	}
	
	/*
	Makes the HTML string for hte cotnact display Panel, where contact is Viewed.
	FIXME: In a real version, you would probably use jQuery to insert the values into the DOM elements instead of adding the contact info to the HTML string.
	*/
	this.makeContactDisplayPanelString = function(contactInfo) {
		var str;
		return '<div class="contact-view">'
                           + '<div class="contact-view-name">' + contactInfo.firstName + ' ' + contactInfo.lastName + '</div>'
                           + '<div class="contact-view-image-container"><img class="contact-view-image" src="' + contactInfo.photo + '" alt="A Contact" /></div>'
                           + '<button type="button" class="contact-view-phonenumber-container" title="Call '+ contactInfo.firstName +'"><div class="contact-view-phonenumber-label label-phonenumber"><img src="images/call.png" alt="call" /></div><div class="contact-view-phonenumber">' + contactInfo.cell + '</div></button>'
                            + '<a href="mailto:'+ contactInfo.email +'"><button type="button" class="contact-view-emailaddress-container" title="Email '+ contactInfo.firstName +'"><div class="contact-view-emailaddress-label label-emailaddress"><img src="images/email.png" alt="email" /></div><div class="contact-view-emailaddress">' + contactInfo.email +'</div></button></a>'
							+ '<div class="contact-view-homeaddress-container"><div class="contact-view-homeaddress-label label-homeaddress">home</div><div class="contact-view-homeaddress">' + contactInfo.homeAddress +'</div></div>'
							+ '<div class="contact-view-workaddress-container"><div class="contact-view-workaddress-label label-workaddress">work</div><div class="contact-view-workaddress">' + contactInfo.workAddress +'</div></div>'
							+ '<div class="contact-view-birthdate-container"><div class="contact-view-birthdate-label label-birthdate">DOB</div><div class="contact-view-birthdate">' + contactInfo.birthdate +'</div></div>'
            + '</div>';
	}
	
	/* Makes the contact viewer editable. */
	this.showContactEditor = function(contactInfo) {
		jQuery('#contact-editor').removeClass("contact-editor-inactive");
		// Show contact info in editor.
		this.refreshContactEditorDisplay(contactInfo);
	}
	
	this.hideContactEditor = function() {
		jQuery('#contact-editor').addClass("contact-editor-inactive");
	}
	
	/* Refreshes the display of the editor with info for the specified contact. */
	this.refreshContactEditorDisplay = function(contactInfo) {
		// TODO: Use JQuery to replace the hardcoded info with the contact's info.
	}
	
	
	/* Show the panel for creating a contact. */
	this.showContactAdder = function() {
		jQuery('#contact-adder').removeClass("contact-adder-inactive");	
	}
	this.hideContactAdder = function() {
		jQuery('#contact-adder').addClass("contact-adder-inactive");	
	}
	
	/* Returns a jQuery element representing a contact item to put in the contact list.*/
	
	this.makeContactListItem = function(contactInfo) {
		// Set the contact info to default if it is undefined.
		contactInfo = {
			firstName: contactInfo.firstName || contactDefault.firstName,
			lastName: contactInfo.lastName || contactDefault.lastName,
			email: contactInfo.email || contactDefault.email,
			cell: contactInfo.cell || contactDefault.cell,
			photo: contactInfo.photo || contactDefault.photo,
			birthdate: contactInfo.birthdate || contactDefault.birthdate,
			homeAddress: contactInfo.homeAddress || contactDefault.homeAddress,
			workAddress: contactInfo.workAddress || contactDefault.workAddress
		};
		// The contact item as HTML.
		var contactItemHTML;
		// The contact item as a jQuery element.
		var contactItemElement;
		contactItemHTML = this.makeListGridItemString(contactInfo);
                    
		contactItemElement = jQuery(contactItemHTML);
		contactItemElement.click(function(self) {
			return function() { self.showContactViewer(contactInfo) };
    	}(this));    
		
		return contactItemElement;
	};
	
	/*
	// Returns the HTML string for the contact item.
	this.makeListItemString = function(contactInfo) {
		return '<div class="contact-item">'
						+ '<div class="contact-item-view-on-click"></div>'
						+ '<div class="contact-item-label-container">'
						+ '<div class="contact-item-name">'+ contactInfo.firstName + ' ' + contactInfo.lastName +'</div>'
                        + '</div>'
                        + '<div class="contact-item-image-container"><img class="contact-item-image" src="'+ contactInfo.photo +'" alt="'+ contactInfo.firstName +'\'s image" /></div>'
                        + '<div class="contact-item-phonenumber-container"><div class="contact-item-phonenumber-label label-phonenumber">cell</div><div class="contact-item-phonenumber">'+ contactInfo.cell +'</div></div>'
                        + '<div class="contact-item-emailaddress-container"><div class="contact-item-emailaddress-label label-emailaddress">email</div><div class="contact-item-emailaddress"><a href="mailto:'+ contactInfo.email +'">'+ contactInfo.email +'</a></div></div>'
                        +'</div>';	
	}
	*/
	
	// Returns the HTML string for the contact item, with classes for the grid format.
	this.makeListGridItemString = function(contactInfo) {
		return '<div class="contact-item-grid">'
						+ '<div class="contact-item-grid-view-on-click"></div>'
						+ '<div class="contact-item-grid-image-container"><img class="contact-item-grid-image" src="'+ contactInfo.photo +'" alt="'+ contactInfo.firstName +'\'s image" /></div>'
						+ '<div class="contact-item-grid-label-container">'
						+ '<div class="contact-item-grid-name">'+ contactInfo.firstName + ' ' + contactInfo.lastName +'</div>'
                        + '</div>'
                        + '<div class="contact-item-grid-phonenumber-container"><button type="button" class="contact-item-grid-phonenumber-label label-phonenumber" title="Call '+ contactInfo.firstName +'"><img src="images/call.png" alt="call" /></button><div class="contact-item-grid-phonenumber">'+ contactInfo.cell +'</div></div>'
                        + '<div class="contact-item-grid-emailaddress-container"><button class="contact-item-grid-emailaddress-label label-emailaddress" title="Email '+ contactInfo.firstName +'"><img src="images/email.png" alt="email" /></button><div class="contact-item-grid-emailaddress"><a href="mailto:'+ contactInfo.email +'">'+ contactInfo.email +'</a></div></div>'
                        +'</div>';
	}
	
	
	this.addListCategoryDivider = function(list, labelName) {
		var li = jQuery('<li class="contact-list-category-label"></li>');
		var elem = this.makeListCategoryDivider(labelName);
		li.append(elem);
		list.append(li);
	}
	/* 
	Makes a category divider with the specified category label string.
	@param labelName The name of the category.
	@return the divider as a jQuery span.
	*/
	this.makeListCategoryDivider = function(labelName) {
		return jQuery(this.makeListCategoryDividerString(labelName));
	}
	
	/*
	Makes the string HTML of the element used as a category divider.
	@return the HTML div as a string.
	*/
	this.makeListCategoryDividerString = function(labelName) {
		return '<span class="contact-list-category-label">' + labelName + '</span>';
	}
	
	
	/* Returns a jQuery element representing a Group item to put in the group list.*/
	this.makeGroupListItem = function(groupInfo) {
		// Set the info to default if info is undefined.
		groupInfo = {
			name: groupInfo.name || groupDefault.name,
			photo: groupInfo.photo || groupDefault.photo
		};
		// The item as HTML.
		var groupItemHTML;
		// The item as a jQuery element.
		var groupItemElement;
		groupItemHTML = this.makeGroupListGridItemString(groupInfo);
                    
		groupItemElement = jQuery(groupItemHTML);
		groupItemElement.click(function(self) {
			//return function() { self.showGroupViewer(groupInfo) };
    	}(this));    
		
		return groupItemElement;
	};
	
	// Returns the HTML string for the group item, with classes for the grid format.
	this.makeGroupListGridItemString = function(info) {
		return '<div class="contact-item-grid">'
						+ '<div class="contact-item-grid-view-on-click"></div>'
						+ '<div class="contact-item-grid-image-container"><img class="contact-item-grid-image" src="'+ info.photo +'" alt="'+ info.name +'\'s image" /></div>'
						+ '<div class="contact-item-grid-label-container">'
						+ '<div class="contact-item-grid-name">'+ info.name + '</div>'
                        + '</div>'
                        +'</div>';
	}
	
	
	/* 
	Adds the contact to the specified list.
	@param list The jQuery <ol> or <ul> element.
	@param contactInfo An object containing contact info.
	*/
	this.addContactToList = function(list, contactInfo) {
		var li;
		var contactElement;
		// Create a list item element.
		li = jQuery("<li></li>");
		// Create a contact item element.
		contactElement = this.makeContactListItem(contactInfo);
		// Add the cotnact item to the list item, and add the list item to the list.
		li.append(contactElement);
		list.append(li);
	};
	
	/*
	Adds the specified group to the jQueryified list (<ol> or <ul>).
	*/
	this.addGroupToList = function(list, groupInfo) {
		var li;
		var element;
		// Create a list item element.
		li = jQuery("<li></li>");
		// Create a group item element.
		element = this.makeGroupListItem(groupInfo);
		// Add the cotnact item to the list item, and add the list item to the list.
		li.append(element);
		list.append(li);
	}
}(); // End of contactUtilities object.

/**
Initializes the contact list with some contacts.
*/
function initContactList() {
	var contactListContainer = jQuery('#contact-list-container');
	var contactList = jQuery('<ol class="contact-list"></ol>');
	contactListContainer.append(contactList);
	for (var i = 0; i < users.length; i++) {
		var contact = users[i];
		contactUtilities.addContactToList(contactList, contact);
	}
}

/**
Same as initContactList, but puts category headers.
FIXME: Does not work yet. Need to restyle the category headers.
*/
function initContactListCategorized() {
	var contactListContainer = jQuery('#contact-list-container');
	var contactList = null;
	var currentLetter = "A";
	var lastLetter = "?";
	for (var i = 0; i < users.length; i++) {
		var contact = users[i];
		currentLetter = contact.firstName.toUpperCase()[0];
		if (contactList === null || currentLetter != lastLetter) {
			// Place an alphabetic divider into the list if one representing the currentLetter was not made before.
			contactUtilities.addListCategoryDivider(contactListContainer, currentLetter);
			// Create the list to add contacts with the corresponding letter.
			contactList = jQuery('<ol class="contact-list"></ol>');
			contactListContainer.append(contactList);
			lastLetter = currentLetter;
		}
		contactUtilities.addContactToList(contactList, contact);
	}
}

/**
Initializes the group list with some contacts.
*/
function initGroupList() {
	var groupListContainer = jQuery('#group-list-container');
	var groupList = jQuery('<ol class="group-list"></ol>');
	groupListContainer.append(groupList);
	for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		contactUtilities.addGroupToList(groupList, group);
	}
}

window.addEventListener('load', function(e) {
	// Init lists.
	initContactList();
	initGroupList();
	// Stuff
	jQuery('#contact-panel-addbutton').click(function(){
		contactUtilities.showContactAdder();
	});
	// Edit Contact stuff
	jQuery('#contact-edit-savebutton').click(function(){
		// TODO: do something to save the contact.
		contactUtilities.hideContactEditor();
	});
	jQuery('#contact-edit-cancelbutton').click(function(){
		contactUtilities.hideContactEditor();
	});
	jQuery('#contact-edit-deletebutton').click(function() {
		// FIXME: it is hardcoded to Delete user Ron Mak only. In a real version, it should delete the currently viewed contact.
		var makIndex;
		for (var i = 0; i < users.length; i++) {
			contact = users[i];
			if (contact.firstName == "Ron" && contact.lastName == "Mak") {
				makIndex = i;
				break;
			}
		}
		// Remove Ron Mak
		users.splice(makIndex, 1);
		/*
		users = users.filter(function(e) {
			return !(e.firstName == "Ron" && e.lastName == "Mak");
		});
		*/
		contactUtilities.hideContactEditor();
		contactUtilities.refreshContactList(users);
		// Show next contact if it exists, otherwise contact above Ron Mak.
		contactUtilities.showContactViewer( users[makIndex] || users[makIndex - 1] );
	});
	// Add contact stuff
	jQuery('#contact-add-savebutton').click(function(){
		// TODO: do something to save the contact.
		contactUtilities.hideContactAdder();
	});
	jQuery('#contact-add-cancelbutton').click(function(){
		contactUtilities.hideContactAdder();
	});
	
});
