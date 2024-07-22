document.addEventListener('DOMContentLoaded', function() {
    const boardsItem = document.querySelector('.boards');
    const boardsHeader = boardsItem.querySelector('.boards-header');
    const boardsContent = boardsItem.querySelector('.boards-content');
    const addNewButton = boardsContent.querySelector('.add-new');

    boardsHeader.addEventListener('click', function() {
        boardsItem.classList.toggle('active');
    });

    addNewButton.addEventListener('click', handleAddNew);

    function handleAddNew(e) {
        e.preventDefault();
        const boardOption = this;
        const span = boardOption.querySelector('span');
        if (span) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = '';
            input.placeholder = 'Enter board name';
            input.className = 'input-wrapper';
            
            span.replaceWith(input);
            input.focus();
    
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    const newBoard = document.createElement('a');
                    newBoard.href = '#';
                    newBoard.className = 'board-option';
                    newBoard.innerHTML = `
                        <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00065 13.2667V2.73337C7.00065 1.73337 6.57398 1.33337 5.51398 1.33337H2.82065C1.76065 1.33337 1.33398 1.73337 1.33398 2.73337V13.2667C1.33398 14.2667 1.76065 14.6667 2.82065 14.6667H5.51398C6.57398 14.6667 7.00065 14.2667 7.00065 13.2667Z" stroke="#EBF7FB" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.6667 8.59998V2.73331C14.6667 1.73331 14.24 1.33331 13.18 1.33331H10.4867C9.42667 1.33331 9 1.73331 9 2.73331V8.59998C9 9.59998 9.42667 9.99998 10.4867 9.99998H13.18C14.24 9.99998 14.6667 9.59998 14.6667 8.59998Z" stroke="#EBF7FB" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>${this.value.trim()}</span>
                    `;
                    
                    boardsContent.insertBefore(newBoard, addNewButton);
                    restoreAddNewButton();
                }
            });
    
            input.addEventListener('blur', restoreAddNewButton);
        }
    
        function restoreAddNewButton() {
            boardOption.innerHTML = `
                <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 5.51331V2.81998C14.6667 1.75998 14.24 1.33331 13.18 1.33331H10.4867C9.42667 1.33331 9 1.75998 9 2.81998V5.51331C9 6.57331 9.42667 6.99998 10.4867 6.99998H13.18C14.24 6.99998 14.6667 6.57331 14.6667 5.51331Z" stroke="#EBF7FB" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.99967 5.67998V2.65331C6.99967 1.71331 6.57301 1.33331 5.51301 1.33331H2.81967C1.75967 1.33331 1.33301 1.71331 1.33301 2.65331V5.67331C1.33301 6.61998 1.75967 6.99331 2.81967 6.99331H5.51301C6.57301 6.99998 6.99967 6.61998 6.99967 5.67998Z" stroke="#EBF7FB" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.99967 13.18V10.4867C6.99967 9.42667 6.57301 9 5.51301 9H2.81967C1.75967 9 1.33301 9.42667 1.33301 10.4867V13.18C1.33301 14.24 1.75967 14.6667 2.81967 14.6667H5.51301C6.57301 14.6667 6.99967 14.24 6.99967 13.18Z" stroke="#EBF7FB" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.66699 11.6667H13.667" stroke="#EBF7FB" stroke-linecap="round"/>
                <path d="M11.667 13.6667V9.66669" stroke="#EBF7FB" stroke-linecap="round"/>
                </svg>
                <span>Add new</span>
            `;
        }
    }
});