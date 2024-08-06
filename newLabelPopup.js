window.showNewLabelPopup = function(cardPopup) {
    const labelPopup = createNewLabelPopup();
    cardPopup.appendChild(labelPopup);

    const labelInput = labelPopup.querySelector('.newlabel-input-container');
    const availableLabelsArea = labelPopup.querySelector('.available-labels-area');
    const cardLabelsArea = labelPopup.querySelector('.card-labels-area');
    const addLabelButton = labelPopup.querySelector('.add-label-button-frame');

    let availableLabels = JSON.parse(localStorage.getItem('availableLabels')) || [];
    let cardLabels = [];

    updateAvailableLabels();

    labelPopup.addEventListener('click', function(e) {
        if (e.target === labelPopup) {
            cardPopup.removeChild(labelPopup);
        }
    });

    // Handle cancel button
    const cancelButton = labelPopup.querySelector('.cancel-button-area');
    cancelButton.addEventListener('click', function() {
        cardPopup.removeChild(labelPopup);
    });

    // Handle add labels button
    const addLabelsButton = labelPopup.querySelector('.add-labels-button-area');
    addLabelsButton.addEventListener('click', function() {
        // Save the cardLabels to the card (you'll need to implement this part)
        console.log('Labels to add to card:', cardLabels);
        cardPopup.removeChild(labelPopup);
    });

    // Color dropdown functionality
    const colorInputField = labelPopup.querySelector('.color-input-field');
    const colorsDropdown = labelPopup.querySelector('#colorsDropdown');
    const selectedColor = labelPopup.querySelector('#selectedColor');
    const colorOptions = labelPopup.querySelectorAll('.color-option');

    // Set default color
    const defaultColor = '#91cd56';
    selectedColor.style.backgroundColor = defaultColor;
    selectedColor.setAttribute('data-color', defaultColor);

    // Toggle dropdown
    colorInputField.addEventListener('click', function(e) {
        e.stopPropagation();
        colorsDropdown.style.display = colorsDropdown.style.display === 'none' ? 'flex' : 'none';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        colorsDropdown.style.display = 'none';
    });

    // Prevent closing when clicking inside the dropdown
    colorsDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            selectedColor.style.backgroundColor = color;
            selectedColor.setAttribute('data-color', color);
            colorsDropdown.style.display = 'none';
        });
    });

    // Add new label
    addLabelButton.addEventListener('click', function() {
        const labelName = labelInput.value.trim();
        const labelColor = selectedColor.getAttribute('data-color');
        if (labelName) {
            const newLabel = { name: labelName, color: labelColor };
            availableLabels.push(newLabel);
            updateAvailableLabels();
            localStorage.setItem('availableLabels', JSON.stringify(availableLabels));
            labelInput.value = '';
        }
    });

    function updateAvailableLabels() {
        availableLabelsArea.innerHTML = '';
        availableLabels.forEach(label => {
            const labelElement = createLabelElement(label);
            availableLabelsArea.appendChild(labelElement);
        });

        // Use event delegation for available labels
        availableLabelsArea.addEventListener('click', function(e) {
            const labelElement = e.target.closest('.card-label');
            if (labelElement) {
                const labelName = labelElement.querySelector('.card-label-text').textContent;
                if (e.target.closest('.remove-icon-wrapper')) {
                    availableLabels = availableLabels.filter(l => l.name !== labelName);
                    localStorage.setItem('availableLabels', JSON.stringify(availableLabels));
                    updateAvailableLabels();
                } else {
                    if (!cardLabels.some(l => l.name === labelName)) {
                        const label = availableLabels.find(l => l.name === labelName);
                        cardLabels.push(label);
                        updateCardLabels();
                    }
                }
            }
        });
    }

    function updateCardLabels() {
        cardLabelsArea.innerHTML = '';
        cardLabels.forEach(label => {
            const labelElement = createLabelElement(label);
            cardLabelsArea.appendChild(labelElement);
        });

        // Use event delegation for remove icons
        cardLabelsArea.addEventListener('click', function(e) {
            if (e.target.closest('.remove-icon-wrapper')) {
                const labelElement = e.target.closest('.card-label');
                const labelName = labelElement.querySelector('.card-label-text').textContent;
                cardLabels = cardLabels.filter(l => l.name !== labelName);
                updateCardLabels();
            }
        });
    }

    function createLabelElement(label) {
        const labelElement = document.createElement('div');
        labelElement.className = 'card-label';
        
        // Set background color with 20% opacity
        const rgb = hexToRgb(label.color);
        labelElement.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
        
        // Set text color
        labelElement.style.color = label.color;

        const labelText = document.createElement('div');
        labelText.className = 'card-label-text';
        labelText.textContent = label.name;
        labelElement.appendChild(labelText);

        const removeIconWrapper = document.createElement('div');
        removeIconWrapper.className = 'remove-icon-wrapper';

        const removeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        removeIcon.setAttribute("width", "14");
        removeIcon.setAttribute("height", "14");
        removeIcon.setAttribute("viewBox", "0 0 14 14");
        removeIcon.setAttribute("fill", "none");
        removeIcon.innerHTML = `
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="${label.color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        removeIcon.className = 'remove-label-icon';
        
        removeIconWrapper.appendChild(removeIcon);
        labelElement.appendChild(removeIconWrapper);

        return labelElement;
    }

    function hexToRgb(color) {
        if (color.startsWith('rgb')) {
            const [r, g, b] = color.match(/\d+/g);
            return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
        }
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};

function createNewLabelPopup() {
    const labelPopupWrapper = document.createElement('div');
    labelPopupWrapper.style.position = 'absolute';
    labelPopupWrapper.style.top = '50%';
    labelPopupWrapper.style.left = '50%';
    labelPopupWrapper.style.width = '100%';
    labelPopupWrapper.style.height = '100%';
    labelPopupWrapper.style.display = 'flex';
    labelPopupWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    labelPopupWrapper.style.justifyContent = 'center';
    labelPopupWrapper.style.alignItems = 'center';
    labelPopupWrapper.style.transform = 'translate(-50%, -50%)';
    labelPopupWrapper.style.zIndex = '1001';

    const labelPopupContent = document.createElement('div');
    labelPopupContent.className = 'new-label-popup';
    labelPopupContent.innerHTML = `
     <div class="colors-dropdown" id="colorsDropdown" style="display: none;">
                                        <div class="colors-container">
                                            <div class="color-option color-option-1" data-color="#91cd56"></div>
                                            <div class="color-option color-option-2" data-color="#34d1b2"></div>
                                            <div class="color-option color-option-3" data-color="#01b0fd"></div>
                                            <div class="color-option color-option-4" data-color="#8568f4"></div>
                                            <div class="color-option color-option-5" data-color="#ae52d3"></div>
                                            <div class="color-option color-option-6" data-color="#ec4ea5"></div>
                                            <div class="color-option color-option-7" data-color="#fb8120"></div>
                                            <div class="color-option color-option-8" data-color="#fac624"></div>
                                            <div class="color-option color-option-9" data-color="#a9a9a9"></div>
                                        </div>
                            </div>
        <div class="content-frame">
            <div class="text-container">
                <div class="addlabel-main-text">Add labels to card</div>
                <div class="supporting-text">Labels help organize your cards.</div>
            </div>
            <div class="labels-input-area">
                    <div class="input-area">
                        <div class="input-label">Label</div>
                        <div class="selection-frame">
                            <div class="label-dynamic-input-frame">
                                <input class="newlabel-input-container" placeholder="Enter label name">
                                <div class="color-input-field">
                                    <div class="color-field-content">
                                        <div class="color-circle" id="selectedColor"></div>
                                        <img class="vuesaxlineararrow-down-icon" alt="" src="assets/arrow-down-labels.svg">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="add-label-button-frame">
                                <img class="plus-icon-container" alt="" src="assets/Plus Icon Container.svg">
                            </div>
                        </div>
                        <div class="available-labels-area"></div>
                </div>
                
            </div>
            <div class="input-area">
                <div class="labels-input-area">
                    <div class="input-label">Card labels</div>
                </div>
                <div class="card-labels-area"></div>
            </div>
            <div class="add-labels-actions-section">
                <div class="action-buttons-area">
                    <div class="cancel-button-area">
                        <div class="cancel-button-base">
                            <div class="cancel-button-text">Cancel</div>
                        </div>
                    </div>
                    <div class="add-labels-button-area">
                        <div class="add-labels-button-base">
                            <div class="add-labels-button">Add labels</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    labelPopupWrapper.appendChild(labelPopupContent);
    return labelPopupWrapper;
}