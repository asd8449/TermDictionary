let dictionary = {
    "apple": "A fruit that is typically round and red, green, or yellow.",
    "banana": "A long, curved fruit that has a thick skin and soft sweet flesh.",
    "cherry": "A small, round stone fruit that is typically bright or dark red."
};

document.getElementById('addButton').addEventListener('click', function() {
    const newWord = document.getElementById('newWordInput').value.toLowerCase();
    const newDefinition = document.getElementById('definitionInput').value;

    if (newWord && newDefinition) {
        dictionary[newWord] = newDefinition;
        alert(`Word "${newWord}" has been added/updated.`);
        updateWordList();
    } else {
        alert("Please enter both a word and a definition.");
    }
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const deleteWord = document.getElementById('deleteWordInput').value.toLowerCase();

    if (deleteWord in dictionary) {
        delete dictionary[deleteWord];
        alert(`Word "${deleteWord}" has been deleted.`);
        updateWordList();
    } else {
        alert("Word not found in dictionary.");
    }
});

document.getElementById('showWordsButton').addEventListener('click', function() {
    updateWordList();
});

function updateWordList() {
    const searchWord = document.getElementById('searchWordsInput').value.toLowerCase();
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = ""; // Clear the list before adding new items

    for (const word in dictionary) {
        if (word.includes(searchWord)) {
            const listItem = document.createElement('li');

            // Create the edit button
            const editButton = document.createElement('button');
            editButton.textContent = '수정';
            editButton.addEventListener('click', function() {
                document.getElementById('newWordInput').value = word;
                document.getElementById('definitionInput').value = dictionary[word];
            });

            // Add the button and word text to the list item
            listItem.appendChild(editButton);
            listItem.appendChild(document.createTextNode(` ${word}: ${dictionary[word]}`));

            wordList.appendChild(listItem);
        }
    }
}
