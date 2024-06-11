let dictionary = {};

document.addEventListener('DOMContentLoaded', function() {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(data => {
            dictionary = data;
            updateWordList();
        });
});

document.getElementById('addButton').addEventListener('click', function() {
    const newWord = document.getElementById('newWordInput').value.toLowerCase();
    const newDefinition = document.getElementById('definitionInput').value;

    if (newWord && newDefinition) {
        dictionary[newWord] = newDefinition;
        saveDictionary();
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
        saveDictionary();
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
            editButton.textContent = 'Edit';
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

function saveDictionary() {
    const blob = new Blob([JSON.stringify(dictionary, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dictionary.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
