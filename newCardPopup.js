// newCardPopup.js

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.main-content');

    document.body.addEventListener('click', function(event) {
        const target = event.target;
        if (target.closest('.add-new-button') || target.closest('.add-icon')) {
            showNewCardPopup(target.closest('.to-do-list'));
        }
    });

    function showNewCardPopup(list) {
        const popup = createNewCardPopup();
        mainContent.appendChild(popup);

        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                mainContent.removeChild(popup);
            }
        });

        // Close popup when clicking the X icon
        const closeButton = popup.querySelector('.x-icon');
        closeButton.addEventListener('click', function() {
            mainContent.removeChild(popup);
        });

        // Handle cancel button
        const cancelButton = popup.querySelector('.new-card-popup-cancel-button');
        cancelButton.addEventListener('click', function() {
            mainContent.removeChild(popup);
        });

        // Handle add card button
        const addCardButton = popup.querySelector('.new-card-popup-add-card-button');
        addCardButton.addEventListener('click', function() {
            // Add your logic here to create a new card
            console.log('Add new card to list:', list);
            mainContent.removeChild(popup);
        });

        // Handle add label button
        const addLabelButton = popup.querySelector('.add-label-button');
        addLabelButton.addEventListener('click', function() {
            // Use the global showNewLabelPopup function
            window.showNewLabelPopup(popup);
        });
    }

    function createNewCardPopup() {
        const popupWrapper = document.createElement('div');
        popupWrapper.className = 'new-card-popup-overlay';
        popupWrapper.style.position = 'fixed';
        popupWrapper.style.top = '0';
        popupWrapper.style.left = '0';
        popupWrapper.style.width = '100%';
        popupWrapper.style.height = '100%';
        popupWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popupWrapper.style.display = 'flex';
        popupWrapper.style.justifyContent = 'center';
        popupWrapper.style.alignItems = 'center';
        popupWrapper.style.zIndex = '1000';

        const popupContent = document.createElement('div');
        popupContent.className = 'new-card-popup';
        popupContent.innerHTML = `
            <div class="new-card-popup-header">
                <div class="new-card-popup-content">
                    <div class="card-icon">
                        <img class="card-icon1" alt="" src="assets/card icon.svg">
                    </div>
                    <div class="text-and-supporting-text">
                        <div class="text">Add a new card</div>
                        <div class="supporting-text">Fill in the fields below to add a card.</div>
                    </div>
                </div>
                <img class="new-card-popup-divider-header" alt="" src="assets/new card popup Divider header.svg">
                <div class="x-icon">
                    <div class="x">
                        <img class="icon" alt="" src="assets/xIcon.svg">
                    </div>
                </div>
            </div>
            <div class="new-card-popup-form">
                <div class="form">
                    <div class="fullname-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label">
                                <div class="label">Full name</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Full name">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/user.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="company-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label">
                                <div class="label">Company</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Company">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/buliding.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="company-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label">
                                <div class="label">Position</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Position">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/briefcase.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="company-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label">
                                <div class="label">Email address</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Email address">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/sms.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="company-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label">
                                <div class="label">Phone number</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Phone number">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/call.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="website-input-field">
                        <div class="fullname-input-field">
                            <div class="input-with-label5">
                                <div class="label">Website</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Website">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/global.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="website-input-field">
                        <div class="company-input-field">
                            <div class="input-with-label">
                                <div class="label">Meeting date</div>
                                <div class="newcards-input-container">
                                    <input class="input" placeholder="Select a date">
                                    <img class="vuesaxlinearuser-icon" alt="" src="assets/calendar-2.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="content-divider-icon" alt="" src="assets/content Divider.svg">
                <div class="labels-and-attachments">
                    <div class="add-labels">
                        <div class="fullname-input-field">
                            <div class="text8">Labels</div>
                            <div class="supporting-text1">Labels help organize your cards.</div>
                        </div>
                        <div class="labels-container">
                            <div class="add-label-button">
                                <img class="plus-icon" alt="" src="assets/plus label.svg">
                            </div>
                        </div>
                    </div>
                    <div class="add-labels">
                        <div class="fullname-input-field">
                            <div class="text8">Attachments</div>
                            <div class="supporting-text2">Add related attachments to the card here.</div>
                        </div>
                        <div class="file-upload">
                            <div class="file-upload-base">
                                <div class="content7">
                                    <img class="file-upload-icon" alt="" src="assets/file upload icon.svg">
                                    <div class="text-and-supporting-text3">
                                        <div class="action">
                                            <div class="upload-button">
                                                <div class="upload-button-base">
                                                    <div class="click-to-upload">Click to upload</div>
                                                </div>
                                            </div>
                                            <div class="text11">or drag and drop</div>
                                        </div>
                                        <div class="supporting-text3">PDF, DOC, XLS, PNG or ZIP</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="new-card-popup-footer">
                <div class="new-card-popup-actions">

                    <div class="delete-card-popup-button">
                            <div class="delete-card-button-base">
                                <svg class="delete-card-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 4.98333C14.725 4.70833 11.9333 4.56667 9.15 4.56667C7.5 4.56667 5.85 4.65 4.2 4.81667L2.5 4.98333" stroke="#E74C3C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.08301 4.14167L7.26634 3.05001C7.39967 2.25834 7.49967 1.66667 8.90801 1.66667H11.0913C12.4997 1.66667 12.608 2.29167 12.733 3.05834L12.9163 4.14167" stroke="#E74C3C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.7087 7.61667L15.167 16.0083C15.0753 17.3167 15.0003 18.3333 12.6753 18.3333H7.32533C5.00033 18.3333 4.92533 17.3167 4.83366 16.0083L4.29199 7.61667" stroke="#E74C3C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.6084 13.75H11.3834" stroke="#E74C3C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.91699 10.4167H12.0837" stroke="#E74C3C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div class="delete-card-button-label">Delete card</div>
                            </div>
                    </div>

                    <div class="new-card-popup-buttons">
                        <div class="new-card-popup-cancel-button">
                            <div class="button-base">
                                <div class="text12">Cancel</div>
                            </div>
                        </div>
                        <div class="new-card-popup-add-card-button">
                            <div class="button-base1">
                                <div class="label">Add card</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="new-card-popup-divider-footer">
                    <img class="new-card-popup-divider-footer1" alt="" src="assets/new card popup Divider footer.svg">
                </div>
            </div>
        `;

        popupWrapper.appendChild(popupContent);

    // resize event listener
    window.addEventListener('resize', () => {
        scalePopup(popupContent);
    });
    
    scalePopup(popupContent);

        return popupWrapper;
    }
    function scalePopup(popup) {
        const baseWidth = 674;
        const baseHeight = 917;
        const scaleX = window.innerWidth / baseWidth;
        const scaleY = window.innerHeight / baseHeight;
        const scale = Math.min(scaleX, scaleY, 1);
    
        popup.style.transform = `scale(${scale})`;
        popup.style.transformOrigin = 'center center';
    }
});