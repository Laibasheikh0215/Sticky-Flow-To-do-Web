const stickyContainer = document.getElementById('stickyContainer');
const noteModal = new bootstrap.Modal(document.getElementById('noteModal'));
const quoteText = document.getElementById('quoteText');

let notes = [];
let editIndex = -1;

// Motivational Quotes
const quotes = [
    "Stay positive, work hard, make it happen.",
    "Believe in yourself and all that you are.",
    "Success is the sum of small efforts repeated daily.",
    "Dream big, work hard, stay focused."
];
function updateQuote() {
    quoteText.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
setInterval(updateQuote, 3000);

// Render Notes
const renderNotes = () => {
    stickyContainer.innerHTML = notes.map((n, i) => `
      <div class='col-md-4 mb-3'>
        <div class='sticky-note ${n.color}'>
          <div class="note-actions">
            <button class="icon-btn" onclick="editNote(${i})"><i class="bi bi-pencil-square"></i></button>
            <button class="icon-btn" onclick="deleteNote(${i})"><i class="bi bi-trash"></i></button>
          </div>
          <h5>${n.title}</h5>
          <p>${n.content}</p>
        </div>
      </div>
      `).join("") + `
      <div class='col-md-4 mb-3'>
        <div class='add-card' id='addCard'>+</div>
      </div>
      `;

    document.getElementById('addCard').addEventListener('click', () => {
        editIndex = -1;
        document.querySelector('.modal-title').innerText = "Add Sticky Note";
        document.getElementById('noteTitle').value = "";
        document.getElementById('noteContent').value = "";
        document.getElementById('noteColor').value = "mango";
        noteModal.show();
    });
};

// Save Note (Add + Edit)
document.getElementById('saveNoteBtn').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const color = document.getElementById('noteColor').value;

    if (editIndex === -1) {
        notes.push({ title, content, color });
    } else {
        notes[editIndex] = { title, content, color };
    }

    noteModal.hide();
    renderNotes();
});

// Delete Note
function deleteNote(i) {
    notes.splice(i, 1);
    renderNotes();
}

// Edit Note
function editNote(i) {
    editIndex = i;
    const n = notes[i];
    document.querySelector('.modal-title').innerText = "Edit Sticky Note";
    document.getElementById('noteTitle').value = n.title;
    document.getElementById('noteContent').value = n.content;
    document.getElementById('noteColor').value = n.color;
    noteModal.show();
}

renderNotes();