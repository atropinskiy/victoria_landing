export interface Localized {
  ru: string
  en: string
}

export interface TextBlock {
  title?: Localized
  text: Localized
  note?: Localized
}

export interface Stage {
  title: Localized
  items: Localized[]
}

export interface Service {
  id: number
  order: number
  title: Localized
  approach?: TextBlock
  stages: Stage[]
}

export const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    order: 1,
    title: { ru: "Бизнес-партнёрство", en: "Business partnership" },
    approach: {
      title: {
        ru: "Особенность моего подхода:",
        en: "The specifics of my approach:",
      },
      text: {
        ru: "После заключения соглашения бизнес партнерства, мы реализуем юридический блок: внесение изменений в учредительные документы, создание корпоративного договора, сопровождение регистрационных действий бизнес партнёрства у нотариуса",
        en: "Once the business partnership agreement is signed, we implement the legal block: amending the founding documents, drafting the corporate agreement, and handling the notarial registration of the business partnership.",
      },
    },
    stages: [
      {
        title: { ru: "1 этап", en: "Stage 1" },
        items: [
          { ru: "Стартовая сессия", en: "Kickoff session" },
          { ru: "Аналитика", en: "Analytics" },
        ],
      },
      {
        title: { ru: "2 этап", en: "Stage 2" },
        items: [
          {
            ru: "Создание планов встреч бизнес-партнёров",
            en: "Planning meetings with business partners",
          },
          {
            ru: "Модерация встреч бизнес-партнёров",
            en: "Moderating meetings with business partners",
          },
        ],
      },
      {
        title: { ru: "3 этап", en: "Stage 3" },
        items: [
          {
            ru: "Проект соглашения бизнес-партнёрства",
            en: "Draft of the business partnership agreement",
          },
          { ru: "Заключительная встреча с подписанием", en: "Final signing meeting" },
        ],
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: { ru: "Бракоразводный процесс", en: "Divorce proceedings" },
    approach: {
      title: {
        ru: "Особенность моего подхода:",
        en: "The specifics of my approach:",
      },
      text: {
        ru: "Прежде чем пойти обычным путём – судиться, мы рассмотрим альтернативное решение – медиацию. Этот подход сохранит нервы, сократив сроки. Оставив всё в полной конфиденциальности для обеих сторон.",
        en: "Before going the usual route of litigation, we'll consider an alternative — mediation. This approach preserves your peace of mind, shortens the timeline, and keeps everything fully confidential for both sides.",
      },
    },
    stages: [
      {
        title: { ru: "1 этап", en: "Stage 1" },
        items: [
          { ru: "Первичная встреча", en: "Initial meeting" },
          { ru: "Аналитика процесса", en: "Case analysis" },
        ],
      },
      {
        title: { ru: "2 этап", en: "Stage 2" },
        items: [{ ru: "Подача документов в суд", en: "Filing with the court" }],
      },
      {
        title: { ru: "3 этап", en: "Stage 3" },
        items: [
          { ru: "Судебный процесс", en: "Court proceedings" },
          { ru: "Исполнительное производство", en: "Enforcement of the ruling" },
        ],
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: { ru: "Медиация", en: "Mediation" },
    approach: {
      title: {
        ru: "Особенность моего подхода:",
        en: "The specifics of my approach:",
      },
      text: {
        ru: "Медиация — это конфиденциальные переговоры с участием независимого посредника, который помогает сторонам услышать друг друга и найти решение без обращения в суд. Такой подход сохраняет отношения, экономит время и оставляет результат под контролем самих сторон.",
        en: "Mediation is a confidential negotiation process with an independent mediator who helps both sides hear each other and reach a resolution without going to court. This approach preserves relationships, saves time, and keeps the outcome in the hands of the parties themselves.",
      },
    },
    stages: [
      {
        title: { ru: "1 этап", en: "Stage 1" },
        items: [
          { ru: "Стартовая сессия", en: "Kickoff session" },
          { ru: "Сессия – обсуждение обеих сторон конфликта", en: "Session — hearing both sides of the conflict" },
        ],
      },
      {
        title: { ru: "2 этап", en: "Stage 2" },
        items: [
          {
            ru: "Сессия по созданию тем для переговоров",
            en: "Session to shape negotiation topics",
          },
          {
            ru: "Индивидуальная работа медиатора с каждой из сторон",
            en: "One-on-one work with each side",
          },
        ],
      },
      {
        title: { ru: "3 этап", en: "Stage 3" },
        items: [
          {
            ru: "Сессия по созданию предложений для урегулирования конфликта",
            en: "Session to draft proposals for resolving the conflict",
          },
        ],
      },
      {
        title: { ru: "4 этап", en: "Stage 4" },
        items: [
          {
            ru: "Подготовка проекта соглашения, заключение соглашения и его подписание",
            en: "Preparing, finalizing and signing the agreement",
          },
        ],
      },
      {
        title: { ru: "5 этап", en: "Stage 5" },
        items: [{ ru: "Финальная сессия", en: "Final session" }],
      },
    ],
  },
  {
    id: 4,
    order: 4,
    title: { ru: "Недвижимость", en: "Real estate" },
    approach: {
      text: {
        ru: "Проведение сделок с коммерческой недвижимостью – БЦ, склады, ритейл, участки под застройку",
        en: "Handling commercial real estate deals — office buildings, warehouses, retail space, land for development",
      },
      note: {
        ru: "В России и за её пределами",
        en: "In Russia and abroad",
      },
    },
    stages: [
      {
        title: { ru: "1 этап", en: "Stage 1" },
        items: [
          { ru: "Полный пакет документов", en: "Full set of documents" },
          { ru: "Due diligence (юридическая проверка чистоты объекта)", en: "Due diligence (legal title check)" },
        ],
      },
      {
        title: { ru: "2 этап", en: "Stage 2" },
        items: [
          { ru: "Переговоры и оптимизация условий", en: "Negotiations and terms optimization" },
          { ru: "Налоговая защита", en: "Tax protection" },
        ],
      },
      {
        title: { ru: "3 этап", en: "Stage 3" },
        items: [
          { ru: "Структура с займами, залогами, опционами", en: "Structuring loans, collateral, and options" },
          { ru: "Контроль оплаты и регистрации", en: "Payment and registration control" },
        ],
      },
    ],
  },
]
