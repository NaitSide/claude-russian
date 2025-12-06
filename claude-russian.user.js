// ==UserScript==
// @name         Claude.ai Русификация
// @namespace    https://github.com/nekit-bes
// @version      1.0.0
// @description  Полная русификация интерфейса Claude.ai
// @author       Nikita (@naitside)
// @match        https://claude.ai/*
// @grant        none
// @icon         https://claude.ai/favicon.ico
// @updateURL    https://raw.githubusercontent.com/nekit-bes/claude-russian/main/claude-russian.user.js
// @downloadURL  https://raw.githubusercontent.com/nekit-bes/claude-russian/main/claude-russian.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Словарь переводов
    const translations = {
        // Главное меню
        'Settings': 'Настройки',
        'Language': 'Язык',
        'Get help': 'Помощь',
        'Upgrade plan': 'Улучшить план',
        'Learn more': 'Узнать больше',
        'Log out': 'Выйти',
        
        // Настройки
        'Account': 'Аккаунт',
        'Appearance': 'Внешний вид',
        'Privacy': 'Конфиденциальность',
        'Capabilities': 'Возможности',
        'Beta features': 'Бета-функции',
        
        // Чат
        'New chat': 'Новый чат',
        'Search chats': 'Поиск по чатам',
        'Today': 'Сегодня',
        'Yesterday': 'Вчера',
        'Previous 7 days': 'Последние 7 дней',
        'Previous 30 days': 'Последние 30 дней',
        
        // Ввод
        'Type a message...': 'Введите сообщение...',
        'Send message': 'Отправить',
        'Stop generating': 'Остановить генерацию',
        
        // Кнопки
        'Copy': 'Копировать',
        'Copied': 'Скопировано',
        'Edit': 'Редактировать',
        'Delete': 'Удалить',
        'Regenerate': 'Пересоздать',
        
        // Проекты
        'Projects': 'Проекты',
        'Create project': 'Создать проект',
        'Project settings': 'Настройки проекта',
        
        // Планы
        'Free': 'Бесплатно',
        'Pro': 'Про',
        'Team': 'Команда',
        
        // Общее
        'Cancel': 'Отмена',
        'Save': 'Сохранить',
        'Close': 'Закрыть',
        'Continue': 'Продолжить',
        'Back': 'Назад',
        'Next': 'Далее',
        'Done': 'Готово'
    };

    // Функция замены текста
    function translateElement(element) {
        if (!element || element.children.length > 0) return;
        
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
        }
    }

    // Функция для перевода всей страницы
    function translatePage() {
        // Переводим все текстовые элементы
        document.querySelectorAll('button, a, span, div, p, h1, h2, h3, label').forEach(el => {
            translateElement(el);
        });
        
        // Переводим placeholder в input полях
        document.querySelectorAll('input, textarea').forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder && translations[placeholder]) {
                input.setAttribute('placeholder', translations[placeholder]);
            }
        });
        
        // Переводим title атрибуты
        document.querySelectorAll('[title]').forEach(el => {
            const title = el.getAttribute('title');
            if (title && translations[title]) {
                el.setAttribute('title', translations[title]);
            }
        });
    }

    // Запускаем перевод при загрузке
    translatePage();

    // Следим за изменениями на странице (для динамического контента)
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    translatePage();
                }
            });
        });
    });

    // Начинаем наблюдение
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('Claude.ai Русификация активирована! 🇷🇺');
})();
