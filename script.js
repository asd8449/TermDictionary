let dictionary = {};

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/api/words')
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
        fetch('http://localhost:5000/api/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word: newWord, definition: newDefinition })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            return fetch('http://localhost:5000/api/words');
        })
        .then(response => response.json())
        .then(data => {
            dictionary = data;
            updateWordList();
        });
    } else {
        alert("용어 혹은 정의가 비어있습니다.");
    }
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const deleteWord = document.getElementById('deleteWordInput').value.toLowerCase();

    if (deleteWord) {
        fetch(`http://localhost:5000/api/words/${deleteWord}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            return fetch('http://localhost:5000/api/words');
        })
        .then(response => response.json())
        .then(data => {
            dictionary = data;
            updateWordList();
        });
    } else {
        alert("삭제 할 용어를 입력해주세요.");
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
