// Delete modal functionality
let deleteBookId = null;

function showDeleteModal(button) {
    const bookId = button.getAttribute('data-id');
    const bookTitle = button.getAttribute('data-title');
    deleteBookId = bookId;  

    document.getElementById('deleteBookTitle').textContent = bookTitle;
    document.getElementById('deleteForm').action = `/books/delete/${bookId}`;
    document.getElementById('deleteModal').classList.remove('hidden');
    document.getElementById('deleteModal').classList.add('flex');
}

function hideDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    document.getElementById('deleteModal').classList.remove('flex');
    deleteBookId = null;
}

// Close modal when clicking outside
document.getElementById('deleteModal').addEventListener('click', (e) => {
    if (e.target.id === 'deleteModal') {
        hideDeleteModal();
    }
});

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', () => {
    const alerts = document.querySelectorAll('[role="alert"]');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.add('opacity-0', '-translate-y-2', 'transition-all', 'duration-300');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500', 'ring-red-500');
                    field.classList.remove('border-gray-300');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500', 'ring-red-500');
                    field.classList.add('border-gray-300');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});