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
        'Settings': '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438',
        'Language': '\u042f\u0437\u044b\u043a',
        'Get help': '\u041f\u043e\u043c\u043e\u0449\u044c',
        'Upgrade plan': '\u0423\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u043f\u043b\u0430\u043d',
        'Learn more': '\u0423\u0437\u043d\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435',
        'Log out': '\u0412\u044b\u0439\u0442\u0438',
        
        // Настройки
        'Account': '\u0410\u043a\u043a\u0430\u0443\u043d\u0442',
        'Appearance': '\u0412\u043d\u0435\u0448\u043d\u0438\u0439 \u0432\u0438\u0434',
        'Privacy': '\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c',
        'Capabilities': '\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438',
        'Beta features': '\u0411\u0435\u0442\u0430-\u0444\u0443\u043d\u043a\u0446\u0438\u0438',
        
        // Чат
        'New chat': '\u041d\u043e\u0432\u044b\u0439 \u0447\u0430\u0442',
        'Search chats': '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0447\u0430\u0442\u0430\u043c',
        'Today': '\u0421\u0435\u0433\u043e\u0434\u043d\u044f',
        'Yesterday': '\u0412\u0447\u0435\u0440\u0430',
        'Previous 7 days': '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 7 \u0434\u043d\u0435\u0439',
        'Previous 30 days': '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 30 \u0434\u043d\u0435\u0439',
        
        // Ввод
        'Type a message...': '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...',
        'Send message': '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c',
        'Stop generating': '\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044e',
        
        // Кнопки
        'Copy': '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c',
        'Copied': '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e',
        'Edit': '\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c',
        'Delete': '\u0423\u0434\u0430\u043b\u0438\u0442\u044c',
        'Regenerate': '\u041f\u0435\u0440\u0435\u0441\u043e\u0437\u0434\u0430\u0442\u044c',
        
        // Проекты
        'Projects': '\u041f\u0440\u043e\u0435\u043a\u0442\u044b',
        'Create project': '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442',
        'Project settings': '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430',
        
        // Планы
        'Free': '\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e',
        'Pro': '\u041f\u0440\u043e',
        'Team': '\u041a\u043e\u043c\u0430\u043d\u0434\u0430',
        
        // Общее
        'Cancel': '\u041e\u0442\u043c\u0435\u043d\u0430',
        'Save': '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c',
        'Close': '\u0417\u0430\u043a\u0440\u044b\u0442\u044c',
        'Continue': '\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c',
        'Back': '\u041d\u0430\u0437\u0430\u0434',
        'Next': '\u0414\u0430\u043b\u0435\u0435',
        'Done': '\u0413\u043e\u0442\u043e\u0432\u043e'
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

    console.log('Claude.ai \u0420\u0443\u0441\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u0430! \ud83c\uddf7\ud83c\uddfa');
})();
