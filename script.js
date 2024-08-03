document.addEventListener('DOMContentLoaded', () => {
    const chowdeckContainer = document.querySelector('.project');
    let draggedElement = null;
  
    chowdeckContainer.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('chowdeck')) {
        draggedElement = e.target;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
      }
    });
  
    chowdeckContainer.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('chowdeck')) {
        e.target.classList.remove('dragging');
      }
    });
  
    chowdeckContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(chowdeckContainer, e.clientY);
      if (afterElement == null) {
        chowdeckContainer.appendChild(draggedElement);
      } else {
        chowdeckContainer.insertBefore(draggedElement, afterElement);
      }
    });
  
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.chowdeck:not(.dragging)')];
  
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  });
  