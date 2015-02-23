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
	{firstName: "Doublecheese", lastName: "Burger", email: "mcdonalds@sjsu.edu", cell: "(408)555-1234", photo: "images/burger.png", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"},
	{firstName: "French", lastName: "Fries", email: "fries@sjsu.edu", cell: "(408)555-1234", photo: "images/fries.png", birthdate: "1/1/2015", homeAddress: "One Washington Square, San Jose, CA 95192", workAddress: "One Washington Square, San Jose, CA 95192"
	}];
var globalContactInfo;

var groups = [
	{name: "Friends", photo: "images/group1.jpg"},
	{name: "Coworkers", photo: "images/group2.jpg"},
	{name: "Important", photo: "images/group3.jpg"}
];

// Default contact info.
var contactDefault = {firstName: "", lastName: "", email: "", cell: "", photo: "images/no-image.png", birthdate: "1/1/2015",homeAddress: "", workAddress: ""};
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

	/* 
	Highlights the specified selected contact and de-highlights all others. 
	@param selected The contact info for the selected user.
	*/
	this.highlightContact = function (selected) {
		for (var i = 0; i < users.length; i++) {
			var contact = users[i];
			if (contact.firstName == selected.firstName && contact.lastName == selected.lastName) {
				$(document.getElementById(this.getContactInfoId(contact))).addClass('contact-item-selected');
			}
			else {
				$(document.getElementById(this.getContactInfoId(contact))).removeClass('contact-item-selected');
			}
		}
	}
	
	/* 
	Refreshes the list of contacts with the specfied list of contacts. 
	Causes currently selected user to be highlighted on the contact list.
	*/
	this.refreshContactList = function(contacts) {
		var contactListContainer = jQuery('#contact-list-container');
		var contactList = jQuery('<ol class="contact-list"></ol>');
		contactListContainer.empty();
		contactListContainer.append(contactList);
		for (var i = 0; i < contacts.length; i++) {
			var contact = contacts[i];
			this.addContactToList(contactList, contact);
			// Highlight the contact if it is the currently selected one.
			if(contact.firstName == globalContactInfo.firstName && contact.lastName == globalContactInfo.lastName) {
				this.highlightContact(contact);
			}
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
		this.hideGroupViewer();
		this.hideGroupEditor();
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
		this.hideGroupViewer();
		this.hideGroupEditor();
	}
	/* Show group list as full grid. */
	this.showGroupList = function() {
		jQuery('#group-list').removeClass("group-list-inactive");
		jQuery('#group-list').removeClass("group-list-thin");
	}
	this.showGroupListThin = function() {
		jQuery('#group-list').addClass("group-list-thin");
		jQuery('#group-list').removeClass("group-list-inactive");
	};
	
	this.showGroupViewer = function() {
		this.hideGroupEditor();
		this.showGroupListThin();
		jQuery('#group-viewer').removeClass("group-viewer-inactive");
	}
	this.hideGroupViewer = function() {
		jQuery('#group-viewer').addClass("group-viewer-inactive");
	}
	
	this.showGroupEditor = function() {
		this.hideGroupViewer();
		this.showGroupListThin();
		jQuery('#group-editor').removeClass("group-editor-inactive");
	}
	this.hideGroupEditor = function() {
		jQuery('#group-editor').addClass("group-editor-inactive");
	}
	
	/* HIde group list. */
	this.hideGroupList = function() {
		jQuery('#group-list').addClass("group-list-inactive");
	}
	
	
	
	/* View the contact with the specified info. */
	this.showContactViewer = function(contactInfo) {
		globalContactInfo = contactInfo;
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
		var deleteButton;
		var panel;
		// Make the button for editing the contact.
		editButton = jQuery('<button id="contact-view-editbutton">edit contact</button>');
		// When the edit button is clicked, show the edit screen.
		editButton.click(function(self) {
			return function() {
				self.showContactEditor(contactInfo);
			};
		}(this));
		
		
		// Make the button for deleting the contact.
		deleteButton = jQuery('<button id="contact-view-delete" >Delete</button>');
		// When the delete button is clicked, delete the contact.
		deleteButton.click(function(self) {
			return function() {
				 if (confirm("Are you sure you want to remove '"+ globalContactInfo.firstName + " " + globalContactInfo.lastName +"' from your contact list?") == true) {
            
					for (var i = 0; i < users.length; i++) {
						var contact = users[i];
						if(contact.firstName == globalContactInfo.firstName && contact.lastName == globalContactInfo.lastName) {
							//var contactList = jQuery(document.getElementById("contact-list-id"));
							//contactList.remove(document.getElementById(self.getContactInfoId(globalContactInfo)));
							$(document.getElementById(self.getContactInfoId(globalContactInfo))).remove();
							users.splice(i,1);
							if(i == (users.length)) {
								// Display  0
								self.showContactViewer(users[0]);
							} else {
								self.showContactViewer(users[i]);
							}
							break;
						}				
					}
					self.refreshContactList(users);
				}
			};
		}(this));
		
		
		
		// Make the main panel.
		panel = jQuery(this.makeContactDisplayPanelString(contactInfo));
		// Put everything into a container.
		container = jQuery('<div></div>');
		container.append(deleteButton);
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
					+ '<div id="contact-view-group-container">'
            		+ '<div id="contact-view-group-label">Groups</div>'
					+ this.makeContactViewGroupItemString(groups[0])
					+ this.makeContactViewGroupItemString(groups[1])
	        	+ '</div>'
            + '</div>';
	};
	
	// Returns the HTML string for the group item for use in the Contact View page.
	this.makeContactViewGroupItemString = function(info) {
		return '<div class="contact-view-group-item">'
						+ '<div class="contact-view-group-item-on-click clickable"></div>'
						+ '<div class="contact-view-group-item-image-container"><img class="contact-view-group-item-image" src="'+ info.photo +'" alt="'+ info.name +'" /></div>'
						+ '<div class="contact-view-group-item-label-container">'
						+ '<div class="contact-view-group-item-name">'+ info.name + '</div>'
                        + '</div>'
                        +'</div>';
	};
	
	// Returns the HTML string for the group item for use in the Contact Edit page.
	this.makeContactEditGroupItemString = function(info) {
		return '<div class="contact-edit-group-item">'
						+ '<div class="contact-view-group-item-on-click clickable"></div>'
						+ '<div class="contact-view-group-item-image-container"><img class="contact-edit-group-remove-label" src="images/group-remove-label.png" alt="Remove group" /><img class="contact-view-group-item-image" src="'+ info.photo +'" alt="'+ info.name +'" /></div>'
						+ '<div class="contact-view-group-item-label-container">'
						+ '<div class="contact-view-group-item-name">'+ info.name + '</div>'
                        + '</div>'
                        +'</div>';
	};
	
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
			return function() { 
				self.showContactViewer(contactInfo);
				// Highlight the currently selected user.
				self.highlightContact(contactInfo);
			};
    	}(this));    
		
		return contactItemElement;
	};
	

	this.getContactInfoId = function(contactInfo){
		return contactInfo.firstName + '_' + contactInfo.lastName;
	};

	/*

	// Returns the HTML string for the contact item.
	this.makeListItemString = function(contactInfo) {
		return '<div id = "' + this.getContactInfoId(contactInfo) + '" class="contact-item">'
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
		return '<div id = "' + this.getContactInfoId(contactInfo) + '"class="contact-item-grid">'
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
		// FIXME: This uses some incorrect classes. Fix them if it is a problem.
		return '<div class="contact-item-grid">'
						+ '<div class="group-item-on-click"></div>'
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
	var contactList = jQuery('<ol id = "contact-list-id" class="contact-list"></ol>');
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
	// Make tabs show the appropriate panel.
	jQuery('#tab-contacts').click(function() {
		contactUtilities.showContactPanelFullOnly();
	});
	jQuery('#tab-groups').click(function() {
		contactUtilities.showGroupListOnly();
	});
	
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
		/*
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
		*/
		// When the delete button is clicked, delete the current viewed contact if confirmed.
		if (confirm("Are you sure you want to remove '"+ globalContactInfo.firstName + " " + globalContactInfo.lastName +"' from your contact list?")) {
			for (var i = 0; i < users.length; i++) {
				var contact = users[i];
			 
				if(contact.firstName == globalContactInfo.firstName && contact.lastName == globalContactInfo.lastName) {
					//var contactList = jQuery(document.getElementById("contact-list-id"));
					//contactList.remove(document.getElementById(self.getContactInfoId(globalContactInfo)));
					$(document.getElementById(contactUtilities.getContactInfoId(globalContactInfo))).remove();
					users.splice(i,1);
					if(i == (users.length)) {
						// Display  0
						contactUtilities.showContactViewer(users[0]);
					} else {
						contactUtilities.showContactViewer(users[i]);
					}
					break;
				}	
			 }
		} 
		contactUtilities.hideContactEditor();
		contactUtilities.refreshContactList(users);
	});
	// Add contact stuff
	jQuery('#contact-add-savebutton').click(function(){
		users.push({firstName: document.getElementById("addcontact-firstname").value, 
		lastName: document.getElementById("addcontact-lastname").value, 
		email: document.getElementById("addcontact-email").value, 
		cell: document.getElementById("addcontact-phone").value, 
		photo: "images/no-image.png", 
		birthdate: document.getElementById("addcontact-dob").value, 
		homeAddress: document.getElementById("addcontact-homeaddress").value, 
		workAddress: document.getElementById("addcontact-officeaddress").value});
		
		var contactList = jQuery(document.getElementById("contact-list-id"));
		contactUtilities.addContactToList(contactList, users[users.length-1]);

		contactUtilities.hideContactAdder();
		// Refresh cotnact list.
		contactUtilities.refreshContactList(users);
	});
	jQuery('#contact-add-cancelbutton').click(function(){
		contactUtilities.hideContactAdder();
		// Refresh Contact List
		contactUtilities.refreshContactList(users);
		
	});
	
	// Group click events.
	$('.group-item-on-click').click(function(){
		contactUtilities.showGroupViewer();
	});
	$('#group-view-editbutton').click(function(){
		contactUtilities.showGroupEditor();
	});
	
});  // End of add event listener
