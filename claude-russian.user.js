// ==UserScript==
// @name         Claude.ai Русификация
// @namespace    https://github.com/naitside
// @version      1.2.1
// @description  Полная русификация интерфейса Claude.ai
// @author       Nikita (@naitside)
// @match        https://claude.ai/*
// @grant        none
// @icon         https://claude.ai/favicon.ico
// @updateURL    https://raw.githubusercontent.com/naitside/claude-russian/main/claude-russian.user.js
// @downloadURL  https://raw.githubusercontent.com/naitside/claude-russian/main/claude-russian.user.js
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
        'Sign in': 'Войти',
        'Sign up': 'Зарегистрироваться',

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
        'Search': 'Поиск',
        'Today': 'Сегодня',
        'Yesterday': 'Вчера',
        'Previous 7 days': 'Последние 7 дней',
        'Previous 30 days': 'Последние 30 дней',
        'Older': 'Старые',

        // Действия с чатами
        'Rename': 'Переименовать',
        'Share': 'Поделиться',
        'Archive': 'Архивировать',
        'Unarchive': 'Разархивировать',
        'Pin': 'Закрепить',
        'Unpin': 'Открепить',
        'Duplicate': 'Дублировать',
        'Move to project': 'Переместить в проект',
        'Remove from project': 'Удалить из проекта',
        'Download': 'Скачать',

        // Ввод
        'Type a message...': 'Введите сообщение...',
        'Ask Claude...': 'Спросите Claude...',
        'Send message': 'Отправить',
        'Stop generating': 'Остановить генерацию',
        'Attach files': 'Прикрепить файлы',
        'Upload image': 'Загрузить изображение',
        'Add context': 'Добавить контекст',

        // Кнопки
        'Copy': 'Копировать',
        'Copied': 'Скопировано',
        'Copy code': 'Копировать код',
        'Edit': 'Редактировать',
        'Delete': 'Удалить',
        'Regenerate': 'Пересоздать',
        'Retry': 'Повторить',
        'Try again': 'Попробовать снова',
        'Confirm': 'Подтвердить',
        'Apply': 'Применить',
        'Reset': 'Сбросить',
        'Refresh': 'Обновить',

        // Проекты
        'Projects': 'Проекты',
        'Create project': 'Создать проект',
        'Project settings': 'Настройки проекта',
        'Add to project': 'Добавить в проект',
        'Project name': 'Название проекта',
        'Project description': 'Описание проекта',
        'View project': 'Просмотр проекта',
        'Edit project': 'Редактировать проект',
        'Delete project': 'Удалить проект',

        // Файлы и документы
        'File': 'Файл',
        'Files': 'Файлы',
        'Folder': 'Папка',
        'Upload': 'Загрузить',
        'Uploading...': 'Загрузка...',
        'Download': 'Скачать',
        'Downloading...': 'Скачивание...',
        'Remove': 'Удалить',
        'Preview': 'Предпросмотр',

        // Статусы и сообщения
        'Thinking...': 'Думаю...',
        'Typing...': 'Печатаю...',
        'Loading...': 'Загрузка...',
        'Processing...': 'Обработка...',
        'Generating...': 'Генерирую...',
        'Something went wrong': 'Что-то пошло не так',
        'Network error': 'Ошибка сети',
        'Error': 'Ошибка',
        'Success': 'Успешно',
        'Failed': 'Не удалось',
        'Completed': 'Завершено',

        // Временные метки
        'Just now': 'Только что',
        'minute ago': 'минуту назад',
        'minutes ago': 'минут назад',
        'hour ago': 'час назад',
        'hours ago': 'часов назад',
        'day ago': 'день назад',
        'days ago': 'дней назад',
        'week ago': 'неделю назад',
        'weeks ago': 'недель назад',
        'month ago': 'месяц назад',
        'months ago': 'месяцев назад',
        'year ago': 'год назад',
        'years ago': 'лет назад',

        // Планы и подписки
        'Free': 'Бесплатно',
        'Pro': 'Про',
        'Team': 'Команда',
        'Enterprise': 'Корпоративный',
        'Upgrade': 'Обновить',
        'Current plan': 'Текущий план',
        'Monthly': 'Ежемесячно',
        'Annually': 'Ежегодно',
        'Subscribe': 'Подписаться',
        'Subscription': 'Подписка',
        'Manage subscription': 'Управление подпиской',
        'Payment method': 'Способ оплаты',
        'Billing history': 'История платежей',

        // Usage / Использование
        'Messages': 'Сообщения',
        'Tokens': 'Токены',
        'Remaining': 'Осталось',
        'Used': 'Использовано',
        'Unlimited': 'Неограниченно',
        'Reset in': 'Сброс через',

        // Claude Code / Терминал
        'Run code': 'Запустить код',
        'Terminal': 'Терминал',
        'Console': 'Консоль',
        'Output': 'Вывод',
        'Input': 'Ввод',
        'Clear': 'Очистить',
        'Stop': 'Остановить',
        'Run': 'Запустить',

        // Общее
        'Cancel': 'Отмена',
        'Save': 'Сохранить',
        'Close': 'Закрыть',
        'Continue': 'Продолжить',
        'Back': 'Назад',
        'Next': 'Далее',
        'Done': 'Готово',
        'Yes': 'Да',
        'No': 'Нет',
        'OK': 'ОК',
        'Submit': 'Отправить',
        'Send': 'Отправить',
        'Create': 'Создать',
        'Update': 'Обновить',
        'View': 'Просмотр',
        'Open': 'Открыть',
        'Select': 'Выбрать',
        'Choose': 'Выбрать',
        'Browse': 'Обзор',
        'Show': 'Показать',
        'Hide': 'Скрыть',
        'Expand': 'Развернуть',
        'Collapse': 'Свернуть',
        'More': 'Ещё',
        'Less': 'Меньше',
        'All': 'Все',
        'None': 'Нет',
        'Default': 'По умолчанию',
        'Custom': 'Пользовательский'
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

        let html = element.innerHTML;
        let translated = false;

        for (const [eng, rus] of Object.entries(translations)) {
            if (html.includes(eng)) {
                const regex = new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                html = html.replace(regex, rus);
                translated = true;
            }
        }

        if (translated) {
            element.innerHTML = html;
        }
    }

    // Функция для перевода частичных совпадений в текстовых узлах
    function translateTextNode(node) {
        if (!node || node.nodeType !== 3) return;

        let text = node.textContent;
        let translated = false;

        for (const [eng, rus] of Object.entries(translations)) {
            if (text.includes(eng)) {
                const regex = new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                text = text.replace(regex, rus);
                translated = true;
            }
        }

        if (translated) {
            node.textContent = text;
        }
    }

    // Функция для перевода конкретного элемента и его потомков
    function translateNode(rootNode) {
        if (!rootNode) return;

        // Переводим текстовые элементы
        const elements = rootNode.querySelectorAll ?
            rootNode.querySelectorAll('button, a, span, div, p, h1, h2, h3, h4, h5, h6, label, li') :
            [];

        elements.forEach(el => {
            translateElement(el);
        });

        // Переводим элементы с HTML разметкой
        const htmlElements = rootNode.querySelectorAll ?
            rootNode.querySelectorAll('p, div, span, li') :
            [];

        htmlElements.forEach(el => {
            if (el.children.length > 0) {
                translateHTML(el);
            }
        });

        // Переводим текстовые узлы напрямую
        if (rootNode.nodeType === 1) { // Element node
            const walker = document.createTreeWalker(
                rootNode,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let node;
            while (node = walker.nextNode()) {
                translateTextNode(node);
            }
        }

        // Переводим placeholder в input полях
        const inputs = rootNode.querySelectorAll ?
            rootNode.querySelectorAll('input, textarea') :
            [];

        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder && translations[placeholder]) {
                input.setAttribute('placeholder', translations[placeholder]);
            }
        });

        // Переводим title атрибуты
        const titledElements = rootNode.querySelectorAll ?
            rootNode.querySelectorAll('[title]') :
            [];

        titledElements.forEach(el => {
            const title = el.getAttribute('title');
            if (title && translations[title]) {
                el.setAttribute('title', translations[title]);
            }
        });

        // Переводим aria-label атрибуты
        const ariaElements = rootNode.querySelectorAll ?
            rootNode.querySelectorAll('[aria-label]') :
            [];

        ariaElements.forEach(el => {
            const ariaLabel = el.getAttribute('aria-label');
            if (ariaLabel && translations[ariaLabel]) {
                el.setAttribute('aria-label', translations[ariaLabel]);
            }
        });
    }

    // Функция для перевода всей страницы
    function translatePage() {
        translateNode(document.body);
    }

    // Запускаем перевод при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', translatePage);
    } else {
        translatePage();
    }

    // Debounce для предотвращения частых вызовов
    let translationTimeout = null;
    let isTranslating = false;

    // Следим за изменениями на странице (для динамического контента)
    const observer = new MutationObserver(mutations => {
        // Предотвращаем рекурсивные вызовы
        if (isTranslating) return;

        // Отменяем предыдущий таймер
        if (translationTimeout) {
            clearTimeout(translationTimeout);
        }

        // Устанавливаем новый таймер с задержкой
        translationTimeout = setTimeout(() => {
            isTranslating = true;

            // Переводим только добавленные узлы
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        translateNode(node);
                    } else if (node.nodeType === 3) { // Text node
                        translateTextNode(node);
                    }
                });
            });

            isTranslating = false;
        }, 100); // Задержка 100мс
    });

    // Начинаем наблюдение
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('Claude.ai Русификация активирована! 🇷🇺 v1.2.1');
})();
