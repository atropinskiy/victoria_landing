export interface Localized {
  ru: string
  en: string
}

export type TestCategory = "MONEY" | "PARTNERSHIP" | "ENTREPRENEUR"

export interface TestOption {
  id: string
  text: Localized
  category?: TestCategory
}

export interface TestQuestion {
  id: string
  text: Localized
  options: TestOption[]
}

export interface TestSection {
  id: string
  title: Localized
  questions: TestQuestion[]
}

export interface Test {
  title: Localized
  sections: TestSection[]
}

export const MOCK_TEST: Test = {
  title: { ru: "Тест партнёра", en: "Partner test" },
  sections: [
    {
      id: "s1",
      title: { ru: "1. Роль и участие", en: "1. Role and participation" },
      questions: [
        {
          id: "q1",
          text: {
            ru: "За какие направления вы отвечаете сейчас?",
            en: "Which areas are you currently responsible for?",
          },
          options: [
            { id: "o1", text: { ru: "Продажи", en: "Sales" }, category: "MONEY" },
            { id: "o2", text: { ru: "Продукт", en: "Product" }, category: "PARTNERSHIP" },
            { id: "o3", text: { ru: "Финансы", en: "Finance" }, category: "MONEY" },
            { id: "o4", text: { ru: "Стратегия", en: "Strategy" }, category: "PARTNERSHIP" },
          ],
        },
        {
          id: "q2",
          text: {
            ru: "Что вы реально вкладываете в партнёрство?",
            en: "What do you actually contribute to the partnership?",
          },
          options: [
            { id: "o5", text: { ru: "Деньги", en: "Money" }, category: "MONEY" },
            { id: "o6", text: { ru: "Время", en: "Time" }, category: "PARTNERSHIP" },
            { id: "o7", text: { ru: "Экспертиза", en: "Expertise" }, category: "PARTNERSHIP" },
            { id: "o8", text: { ru: "Связи", en: "Connections" }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q3",
          text: {
            ru: "Какие решения вы принимаете лично, без согласования? (примеры ситуаций)",
            en: "Which decisions do you make personally, without approval? (example situations)",
          },
          options: [
            {
              id: "o9",
              text: { ru: "Вопросы по улучшению продукта", en: "Product improvement issues" },
              category: "PARTNERSHIP",
            },
            {
              id: "o10",
              text: { ru: "Финансовые изменения", en: "Financial changes" },
              category: "MONEY",
            },
            {
              id: "o11",
              text: { ru: "Найм персонала", en: "Hiring staff" },
              category: "PARTNERSHIP",
            },
            {
              id: "o12",
              text: {
                ru: "Расширение связей, направленных на продукт",
                en: "Expanding product-related connections",
              },
              category: "ENTREPRENEUR",
            },
          ],
        },
        {
          id: "q4",
          text: {
            ru: 'Если бы вы ушли завтра, что в бизнесе «встало бы»? (определите свою незаменимость)',
            en: 'If you left tomorrow, what in the business would "stop"? (define your indispensability)',
          },
          options: [
            { id: "o13", text: { ru: "Ничего", en: "Nothing" } },
            {
              id: "o14",
              text: { ru: "Разработка продукта", en: "Product development" },
              category: "PARTNERSHIP",
            },
            {
              id: "o15",
              text: { ru: "Финансовый поток в продукт", en: "Financial flow into the product" },
              category: "MONEY",
            },
            {
              id: "o16",
              text: { ru: "Структура компании развалится", en: "The company structure would fall apart" },
              category: "PARTNERSHIP",
            },
          ],
        },
      ],
    },
    {
      id: "s2",
      title: { ru: "2. Управление и ответственность", en: "2. Management and responsibility" },
      questions: [
        {
          id: "q5",
          text: {
            ru: "Как сейчас принимаются ключевые решения?",
            en: "How are key decisions currently made?",
          },
          options: [
            { id: "o17", text: { ru: "Все вместе", en: "All together" }, category: "PARTNERSHIP" },
            { id: "o18", text: { ru: "Голосованием", en: "By voting" }, category: "PARTNERSHIP" },
            { id: "o19", text: { ru: "Решаю я", en: "I decide" }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q6",
          text: {
            ru: "Что вы считаете справедливым распределением власти и ответственности? (одной фразой)",
            en: "What do you consider a fair distribution of power and responsibility? (in one phrase)",
          },
          options: [
            { id: "o20", text: { ru: "Да", en: "Yes" }, category: "PARTNERSHIP" },
            {
              id: "o21",
              text: {
                ru: "Да, но хотелось бы внесение корректировок",
                en: "Yes, but I'd like some adjustments",
              },
              category: "PARTNERSHIP",
            },
            {
              id: "o22",
              text: { ru: "Хотелось бы корректировок", en: "I'd like adjustments" },
              category: "ENTREPRENEUR",
            },
            {
              id: "o23",
              text: { ru: "Нужны важные корректировки", en: "Important adjustments are needed" },
              category: "ENTREPRENEUR",
            },
          ],
        },
        {
          id: "q7",
          text: {
            ru: "Кто утверждает бюджеты и контролирует расходы? (укажите имя или роль)",
            en: "Who approves budgets and controls expenses? (specify name or role)",
          },
          options: [
            { id: "o24", text: { ru: "Все вместе", en: "All together" }, category: "PARTNERSHIP" },
            { id: "o25", text: { ru: "Только 1 человек", en: "Only 1 person" } },
            {
              id: "o26",
              text: { ru: "Часть партнёров", en: "Some of the partners" },
              category: "PARTNERSHIP",
            },
            {
              id: "o27",
              text: { ru: "Часть партнёров без меня", en: "Some of the partners, without me" },
              category: "ENTREPRENEUR",
            },
          ],
        },
        {
          id: "q8",
          text: {
            ru: "Что происходит, если партнёры не приходят к согласию? (пример или типичная реакция)",
            en: "What happens if the partners can't reach an agreement? (example or typical reaction)",
          },
          options: [
            {
              id: "o28",
              text: { ru: "Разговариваем, пока все не решим", en: "We talk until we resolve it" },
              category: "PARTNERSHIP",
            },
            { id: "o29", text: { ru: "Ругаемся", en: "We argue" }, category: "ENTREPRENEUR" },
            {
              id: "o30",
              text: {
                ru: "Кто-то один убеждает всех в своей правоте, другие соглашаются",
                en: "One person convinces everyone they're right, the others agree",
              },
              category: "PARTNERSHIP",
            },
          ],
        },
        {
          id: "q9",
          text: {
            ru: "Есть ли регулярные встречи, где подводятся итоги?",
            en: "Are there regular meetings where results are reviewed?",
          },
          options: [
            { id: "o31", text: { ru: "Еженедельно", en: "Weekly" }, category: "PARTNERSHIP" },
            { id: "o32", text: { ru: "Раз в месяц", en: "Once a month" }, category: "PARTNERSHIP" },
            {
              id: "o33",
              text: { ru: "От случая к случаю", en: "Occasionally" },
              category: "ENTREPRENEUR",
            },
            { id: "o34", text: { ru: "Нет", en: "No" } },
          ],
        },
      ],
    },
    {
      id: "s3",
      title: { ru: "3. Финансовая прозрачность и прибыль", en: "3. Financial transparency and profit" },
      questions: [
        {
          id: "q10",
          text: {
            ru: "Кто ведёт учёт поступлений и расходов? (бухгалтер, партнёр, сервис, иное)",
            en: "Who keeps track of income and expenses? (accountant, partner, service, other)",
          },
          options: [
            { id: "o35", text: { ru: "Бухгалтер", en: "Accountant" }, category: "PARTNERSHIP" },
            { id: "o36", text: { ru: "Партнёр", en: "Partner" }, category: "ENTREPRENEUR" },
            { id: "o37", text: { ru: "Сервис", en: "Service" }, category: "PARTNERSHIP" },
          ],
        },
        {
          id: "q11",
          text: {
            ru: "У всех ли партнёров одинаковый доступ к финансовым данным?",
            en: "Do all partners have equal access to financial data?",
          },
          options: [
            { id: "o38", text: { ru: "Да", en: "Yes" }, category: "PARTNERSHIP" },
            { id: "o39", text: { ru: "Частично", en: "Partially" }, category: "PARTNERSHIP" },
            {
              id: "o40",
              text: { ru: "Только у одного", en: "Only one person" },
              category: "ENTREPRENEUR",
            },
            { id: "o41", text: { ru: "Нет", en: "No" } },
          ],
        },
        {
          id: "q12",
          text: { ru: "Как определяется прибыль?", en: "How is profit determined?" },
          options: [
            { id: "o42", text: { ru: "По отчётности", en: "By reporting" }, category: "PARTNERSHIP" },
            {
              id: "o43",
              text: { ru: "По договорённости", en: "By agreement" },
              category: "PARTNERSHIP",
            },
            { id: "o44", text: { ru: '"На глаз"', en: '"By eye"' }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q13",
          text: {
            ru: "Кто решает, сколько распределять и сколько оставлять в бизнесе? (по имени или роли)",
            en: "Who decides how much to distribute and how much to keep in the business? (by name or role)",
          },
          options: [
            { id: "o45", text: { ru: "Общий совет", en: "Joint decision" }, category: "PARTNERSHIP" },
            {
              id: "o46",
              text: { ru: "Тот, кто больше вложил в проект", en: "Whoever invested more in the project" },
              category: "ENTREPRENEUR",
            },
            { id: "o47", text: { ru: "Бухгалтер", en: "Accountant" }, category: "PARTNERSHIP" },
          ],
        },
        {
          id: "q14",
          text: {
            ru: 'Есть ли неоформленные платежи или "серая" часть доходов?',
            en: 'Are there undocumented payments or a "grey" part of income?',
          },
          options: [
            { id: "o48", text: { ru: "Нет", en: "No" }, category: "PARTNERSHIP" },
            { id: "o49", text: { ru: "Частично", en: "Partially" }, category: "PARTNERSHIP" },
            { id: "o50", text: { ru: "Да", en: "Yes" } },
          ],
        },
        {
          id: "q15",
          text: {
            ru: "Как оформляются дополнительные вложения партнёров? (договор, акт, устно)",
            en: "How are additional partner contributions documented? (contract, act, verbally)",
          },
          options: [
            { id: "o51", text: { ru: "Договор", en: "Contract" }, category: "PARTNERSHIP" },
            { id: "o52", text: { ru: "Акт", en: "Act" }, category: "PARTNERSHIP" },
            { id: "o53", text: { ru: "Устно", en: "Verbally" }, category: "ENTREPRENEUR" },
          ],
        },
      ],
    },
    {
      id: "s4",
      title: { ru: "4. Доверие. Взаимодействие. Цели", en: "4. Trust. Interaction. Goals" },
      questions: [
        {
          id: "q16",
          text: {
            ru: "Где, по-вашему, партнёрство теряет доверие? (опишите конкретную зону — финансы, сроки, слова)",
            en: "Where, in your opinion, does the partnership lose trust? (describe the specific area — finance, deadlines, words)",
          },
          options: [
            { id: "o54", text: { ru: "Финансы", en: "Finance" }, category: "ENTREPRENEUR" },
            { id: "o55", text: { ru: "Сроки", en: "Deadlines" } },
            { id: "o56", text: { ru: "Слова", en: "Words" }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q17",
          text: {
            ru: "Бывает ли, что кто-то обещает и не делает?",
            en: "Does it happen that someone promises and doesn't deliver?",
          },
          options: [
            { id: "o57", text: { ru: "Никогда", en: "Never" }, category: "PARTNERSHIP" },
            { id: "o58", text: { ru: "Редко", en: "Rarely" }, category: "ENTREPRENEUR" },
            { id: "o59", text: { ru: "Иногда", en: "Sometimes" }, category: "ENTREPRENEUR" },
            { id: "o60", text: { ru: "Часто", en: "Often" } },
          ],
        },
        {
          id: "q18",
          text: { ru: "Как вы обсуждаете недовольство?", en: "How do you discuss dissatisfaction?" },
          options: [
            { id: "o61", text: { ru: "Напрямую", en: "Directly" }, category: "PARTNERSHIP" },
            {
              id: "o62",
              text: { ru: "Через третьих лиц", en: "Through third parties" },
              category: "ENTREPRENEUR",
            },
            { id: "o63", text: { ru: "Избегаем", en: "We avoid it" }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q19",
          text: {
            ru: "Что помогает вам оставаться командой? (одна фраза)",
            en: "What helps you stay a team? (one phrase)",
          },
          options: [
            { id: "o64", text: { ru: "Терпение", en: "Patience" }, category: "ENTREPRENEUR" },
            {
              id: "o65",
              text: { ru: "Общее видение будущего", en: "A shared vision of the future" },
              category: "PARTNERSHIP",
            },
          ],
        },
        {
          id: "q20",
          text: {
            ru: "Если бы партнёрство было человеком — в каком оно состоянии?",
            en: "If the partnership were a person, what state would it be in?",
          },
          options: [
            { id: "o66", text: { ru: "Энергичное", en: "Energetic" }, category: "PARTNERSHIP" },
            { id: "o67", text: { ru: "Уставшее", en: "Tired" }, category: "ENTREPRENEUR" },
            { id: "o68", text: { ru: "Тревожное", en: "Anxious" }, category: "ENTREPRENEUR" },
          ],
        },
        {
          id: "q21",
          text: {
            ru: "Зачем вы вместе? (одна фраза — смысл партнёрства)",
            en: "Why are you together? (one phrase — the meaning of the partnership)",
          },
          options: [
            {
              id: "o69",
              text: { ru: "Общая цель – развитие продукта", en: "A shared goal — developing the product" },
              category: "PARTNERSHIP",
            },
            {
              id: "o70",
              text: { ru: "Хотим заработать", en: "We want to earn money" },
              category: "ENTREPRENEUR",
            },
            {
              id: "o71",
              text: { ru: "Решили рискнуть", en: "We decided to take a risk" },
              category: "ENTREPRENEUR",
            },
          ],
        },
        {
          id: "q22",
          text: {
            ru: "Что для вас главный результат участия?",
            en: "What is the main result of participation for you?",
          },
          options: [
            { id: "o72", text: { ru: "Деньги", en: "Money" }, category: "ENTREPRENEUR" },
            { id: "o73", text: { ru: "Свобода", en: "Freedom" }, category: "PARTNERSHIP" },
            { id: "o74", text: { ru: "Стабильность", en: "Stability" }, category: "PARTNERSHIP" },
            { id: "o75", text: { ru: "Развитие", en: "Development" }, category: "PARTNERSHIP" },
          ],
        },
        {
          id: "q23",
          text: {
            ru: "Хотите ли вы быть в этом партнёрстве через три года?",
            en: "Do you want to still be in this partnership in three years?",
          },
          options: [
            { id: "o76", text: { ru: "Да", en: "Yes" }, category: "PARTNERSHIP" },
            { id: "o77", text: { ru: "Нет", en: "No" }, category: "ENTREPRENEUR" },
            { id: "o78", text: { ru: "Не уверен(а)", en: "Not sure" }, category: "PARTNERSHIP" },
          ],
        },
        {
          id: "q24",
          text: {
            ru: "Что вы хотите получить от диагностики:",
            en: "What do you want to get from the diagnostic:",
          },
          options: [
            { id: "o79", text: { ru: "Ясность ролей", en: "Clarity of roles" }, category: "PARTNERSHIP" },
            {
              id: "o80",
              text: { ru: "Новую структуру", en: "A new structure" },
              category: "PARTNERSHIP",
            },
            {
              id: "o81",
              text: { ru: "Решение конфликта", en: "Conflict resolution" },
              category: "PARTNERSHIP",
            },
            { id: "o82", text: { ru: "План действий", en: "An action plan" } },
          ],
        },
      ],
    },
  ],
}
