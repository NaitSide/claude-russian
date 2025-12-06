// ==UserScript==
// @name         Claude.ai Русификация
// @namespace    https://github.com/nekit-bes
// @version      1.1.1
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
        
        // Настройки - вкладки
        'General': 'Общие',
        'Account': 'Аккаунт',
        'Appearance': 'Внешний вид',
        'Privacy': 'Конфиденциальность',
        'Capabilities': 'Возможности',
        'Beta features': 'Бета-функции',
        'Billing': 'Оплата',
        'Usage': 'Использование',
        'Connectors': 'Подключения',
        'Claude Code': 'Claude Code',
        
        // Настройки - Profile
        'Profile': 'Профиль',
        'Full name': 'Полное имя',
        'What should Claude call you?': 'Как Claude должен к вам обращаться?',
        'What best describes your work?': 'Что лучше всего описывает вашу работу?',
        'Select your work function': 'Выберите вашу сферу деятельности',
        'What personal preferences should Claude consider in responses?': 'Какие личные предпочтения Claude должен учитывать в ответах?',
        'Your preferences will apply to all conversations, within Anthropic\'s guidelines.': 'Ваши предпочтения будут применяться ко всем беседам в рамках рекомендаций Anthropic.',
        "Your preferences will apply to all conversations, within Anthropic's guidelines.": 'Ваши предпочтения будут применяться ко всем беседам в рамках рекомендаций Anthropic.',
        'personal preferences': 'личные предпочтения',
        "Anthropic's guidelines": 'рекомендаций Anthropic',
        
        // Настройки - Notifications
        'Notifications': 'Уведомления',
        'Response completions': 'Завершение ответов',
        'Get notified when Claude has finished a response. Most useful for long-running tasks like tool calls, Research, and Claude Code on the web.': 'Получать уведомление, когда Claude завершит ответ. Наиболее полезно для долгих задач, таких как вызовы инструментов, Research и Claude Code в веб-версии.',
        'Emails from Claude Code on the web': 'Письма от Claude Code в веб-версии',
        'Get an email when Claude Code on the web has finished building or needs your response.': 'Получать письмо, когда Claude Code в веб-версии завершит сборку или потребует вашего ответа.',
        
        // Настройки - Appearance
        'Color mode': 'Цветовая тема',
        'Light': 'Светлая',
        'Dark': 'Тёмная',
        'System': 'Системная',
        
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
        'Retry': 'Повторить',
        
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
        'Done': 'Готово',
        'Loading...': 'Загрузка...',
        'Error': 'Ошибка',
        'Success': 'Успешно'
    };

    // Функция замены текста
    function translateElement(element) {
        if (!element || element.children.length > 0) return;
        
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
        }
    }
    
    // Функция для перевода текста с сохранением HTML
    function translateHTML(element) {
        if (!element) return;
        
        const html = element.innerHTML;
        for (const [eng, rus] of Object.entries(translations)) {
            if (html.includes(eng)) {
                element.innerHTML = html.replace(new RegExp(eng, 'g'), rus);
            }
        }
    }

    // Функция для перевода всей страницы
    function translatePage() {
        // Переводим все текстовые элементы
        document.querySelectorAll('button, a, span, div, p, h1, h2, h3, h4, label').forEach(el => {
            translateElement(el);
        });
        
        // Переводим элементы с HTML разметкой
        document.querySelectorAll('p, div, span').forEach(el => {
            if (el.children.length > 0 && el.textContent.includes('preferences')) {
                translateHTML(el);
            }
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

    console.log('Claude.ai Русификация активирована! 🇷🇺 v1.1.1');
})();
