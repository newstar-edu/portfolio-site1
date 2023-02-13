'use strict';

/* *********************** */
/* To Do List */
/* *********************** */
const $todoList = $('.todo-list');
const $todoInput = $('.todo-input input');
const $btnAdd = $('.todo-input button');
const $btnAllClear = $('.btn-all-clear');

// 할 일 추가 기능
function onAdd() {
    const todoText = $todoInput.val();
    
    // 폼이 비었을 경우 체크
    if (todoText === '') {
        $todoInput.focus();
        return;
    }

    // 입력 값을 새로운 리스트로 생성
    const todo = createItem(todoText);
    $todoList.prepend(todo);

    // 입력 후 input 초기화
    $todoInput.val('')
    $todoInput.focus();
    setLS();
}

function createItem(todoText) {
    const todo = `
    <div class="todo">
        <span>${todoText}</span>
        <button type="button" class="btn-remove">❎</button>
    </div>`;

    return todo;
}

function setLS () {
    const userList = $todoList.html(); 
    localStorage.setItem('list', userList)
}

function getLS () {
    const userList = localStorage.getItem('list');
    $todoList.html(userList);
}

// 윈도우 로드 시 저장된 할 일 목록 불러오기
$(window).on('load', function() {
    getLS();
})

// Add 버튼 클릭 시 할 일 추가
$btnAdd.on('click', function() {
    onAdd();
})

// 엔터 클릭 시 할 일 추가
$todoInput.on('keyup', function(e) {    
    if (e.key === 'Enter') {
        onAdd();
    }
})

// Remove 버튼 클릭 시 할일 삭제
$(document).on('click', '.btn-remove', function() {
    $(this).parent().remove();
    setLS();
})

// 빗자루 버튼 클릭 시 로컬 스토리지 초기화 & 새로고침
$btnAllClear.on('click', function() {
    localStorage.removeItem('list');
    location.reload();
})

/* *********************** */
/* Change Color Mode */
/* *********************** */
const $toggleSwitch = $('#change-mode');

// 모드 전환하기
function switchMode() {
    const isChecked = $toggleSwitch.prop('checked');
    if (isChecked) {
        setColorMode('dark')
    } else {
        setColorMode('light')
    }
}

// 모드 세팅하기
function setColorMode(modeType) {
    localStorage.setItem('mode', modeType);
    $('body').attr('data-theme', modeType);
    $toggleSwitch.prop('checked', (modeType == 'dark') ? true : false);
}

// 모드 가져오기
function isColorMode() {
    return localStorage.getItem('mode');
}

// 토글 스위치 클릭 시 모드 변경
$toggleSwitch.on('change', function() {
    switchMode();
})

// 윈도우 로드 시 사용자 설정 불러오기
$(window).on('load', function() {
    if (isColorMode() === 'dark') {
        setColorMode('dark');
    } else if (isColorMode() === 'light') {
        setColorMode('light');
    }
})

