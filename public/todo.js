"use strict";

let taskCount = 0;
const todoList = document.querySelector('#todo-list');

// タスクを追加するボタンのイベント
document.querySelector('#add-task').addEventListener('click', () => {
    const taskName = document.querySelector('#task-name').value;
    const taskDetails = document.querySelector('#task-details').value;

    const params = { // URL Encode
        method: "POST",
        body: `name=${encodeURIComponent(taskName)}&details=${encodeURIComponent(taskDetails)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    console.log(params);

    const url = "/add-task";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('タスク追加時にエラーが発生しました');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            document.querySelector('#task-details').value = ""; // 詳細をクリア
        });
});

// タスクリストの更新を確認するボタンのイベント
document.querySelector('#check-updates').addEventListener('click', () => {
    const params = { // URL Encode
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check-updates";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('更新確認時にエラーが発生しました');
            }
            return response.json();
        })
        .then((response) => {
            let serverTaskCount = response.taskCount;
            console.log("サーバーのタスク数:", serverTaskCount);
            console.log("現在のタスク数:", taskCount);

            if (taskCount !== serverTaskCount) {
                const params = {
                    method: "POST",
                    body: `start=${taskCount}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                const url = "/get-tasks";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('タスク取得時にエラーが発生しました');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        taskCount += response.tasks.length;

                        for (let task of response.tasks) {
                            console.log("新しいタスク:", task);

                            let taskContainer = document.createElement('div');
                            taskContainer.className = 'task-container';

                            let taskNameElement = document.createElement('span');
                            taskNameElement.className = 'task-name';
                            taskNameElement.innerText = task.name;

                            let taskDetailsElement = document.createElement('span');
                            taskDetailsElement.className = 'task-details';
                            taskDetailsElement.innerText = task.details;

                            taskContainer.appendChild(taskNameElement);
                            taskContainer.appendChild(taskDetailsElement);

                            todoList.appendChild(taskContainer);
                        }
                    });
            }
        });
});
