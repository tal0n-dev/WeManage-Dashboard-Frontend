document.addEventListener('DOMContentLoaded', function() {
    const boardsItem = document.querySelector('.boards');
    const boardsHeader = boardsItem.querySelector('.boards-header');
    const boardsContent = boardsItem.querySelector('.boards-content');
    const addNewButton = boardsContent.querySelector('.add-new');
    function updateDashboardSummary(total, completed, pending) {
        document.querySelector('.summary-card:nth-child(1) .summary-number').textContent = total;
        document.querySelector('.summary-card:nth-child(2) .summary-number').textContent = completed;
        document.querySelector('.summary-card:nth-child(3) .summary-number').textContent = pending;
    }
    
    // Example usage:
    // updateDashboardSummary(30, 22, 8);
    boardsHeader.addEventListener('click', function() {
        boardsItem.classList.toggle('active');
    });

    addNewButton.addEventListener('click', function(e) {
        e.preventDefault();
        const span = this.querySelector('span');
        if (span) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = '';
            input.placeholder = 'Enter board name';
            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-wrapper';
            inputWrapper.appendChild(input);
            span.parentNode.replaceChild(inputWrapper, span);
            input.focus();
            input.addEventListener('input', function() {
                this.style.width = ((this.value.length || this.placeholder.length) * 8) + 'px';
            });

            input.dispatchEvent(new Event('input'));
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
                    const newSpan = document.createElement('span');
                    newSpan.textContent = 'Add new';
                    this.parentNode.parentNode.replaceChild(newSpan, this.parentNode);
                }
            });
            input.addEventListener('blur', function() {
                const newSpan = document.createElement('span');
                newSpan.textContent = 'Add new';
                this.parentNode.parentNode.replaceChild(newSpan, this.parentNode);
            });
        }
    });
});