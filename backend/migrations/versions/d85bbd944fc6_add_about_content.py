"""add_about_content

Revision ID: d85bbd944fc6
Revises: 1dbfe698c53f
Create Date: 2026-08-06 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'd85bbd944fc6'
down_revision: Union[str, None] = '1dbfe698c53f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


FULL_RU = """<p>Мой путь начался в качестве помощника юриста по семейным и гражданским делам, а уже через несколько лет я возглавила юридический департамент холдинга, который объединял более десяти компаний в сфере строительства, финансов и инвестиций. Там я научилась видеть бизнес целостно и всегда оценивать юридические риски в связи с экономическим результатом.</p>
<p>С 2015 по 2020 год я работала заместителем руководителя практики недвижимости в юридическом бюро. Моя специализация судебные споры по объектам недвижимости и налогам, признание прав собственности, снятие обременений, сопровождение всех сделок с землей, жилыми и коммерческими помещениями. Мои клиенты ценили меня за настойчивость, внимание к деталям и умение выстраивать стратегию защиты.</p>
<p>В 2020–2024 годах я занимала позицию директора по правовым вопросам и управлению рисками в крупном инвестиционно-строительном холдинге. Сопровождала сделки на сотни миллионов рублей, готовила инвестиционные соглашения, контролировала корпоративную структуру компаний, организовывала взаимодействие с банками и застройщиками. Моя работа заключалась в том, чтобы исключить любые юридические ошибки и построить для инвесторов прозрачный и безопасный механизм вложений.</p>
<p>Сегодня я веду частную практику как индивидуальный предприниматель. Это дает мне возможность быть максимально гибкой, подстраиваться под конкретные задачи клиентов и уделять внимание каждой детали.</p>
<ul>
<li><strong>сопровождение сделок с недвижимостью, включая договоры купли-продажи, аренды, ипотеки, цессии и инвестиционные соглашения;</strong></li>
<li><strong>подготовка и проверка договоров любой сложности, в том числе аренды, подряда, займа, совместной деятельности, корпоративных соглашений;</strong></li>
<li><strong>юридические заключения по объектам и сделкам: проверка правовой чистоты, выявление рисков, рекомендации по их устранению;</strong></li>
<li><strong>судебные споры в области недвижимости, корпоративных отношений, взыскания долгов, конфликтов с застройщиками и подрядчиками;</strong></li>
<li><strong>корпоративное сопровождение: регистрация и изменение данных компаний, подготовка протоколов, решений, оформление сделок с долями.</strong></li>
</ul>
<p>Придерживаюсь принципа: юрист должен быть не просто исполнителем, а стратегическим партнером. Всегда объясняю клиенту все возможные варианты действий, оцениваю риски и предлагаю оптимальное решение. Работаю честно, глубоко анализирую документы, нахожу слабые места и сразу предлагаю практические шаги по защите интересов.</p>
<p>За годы работы собрала обширную сеть контактов: нотариусы, кадастровые инженеры, риелторы, налоговые консультанты. Это помогает решать задачи быстрее и комплекснее. Важно, что я всегда на связи: подробно отвечаю на вопросы, объясняю каждую стадию работы, держу клиента в курсе хода дела.</p>
<p>Мои клиенты ценят меня за профессионализм, надежность и умение вести переговоры. Я говорю простым языком, потому что считаю: клиент должен ясно понимать, что и зачем мы делаем.</p>
<p>В МГЮА имени Кутафина дополнительно прошла обучение по медиации, имею квалификацию медиатора. Это дает мне возможность предлагать клиентам не только классические юридические решения, но и эффективные способы досудебного урегулирования конфликтов. Там, где можно сохранить отношения и сэкономить время, я применяю медиативные техники, а когда необходимо - уверенно защищаю интересы в суде.</p>"""

FULL_EN = """<p>My career began as a junior lawyer working on family and civil law matters. Within a few years I rose to head the legal department of a holding company that united more than ten businesses in construction, finance, and investment. That experience taught me to see business holistically and to always weigh legal risk against economic outcome.</p>
<p>From 2015 to 2020, I worked as deputy head of the real estate practice at a law firm. My focus was litigation over real estate and tax matters, establishing ownership rights, removing encumbrances, and supporting all types of transactions involving land, residential, and commercial property. My clients valued my persistence, attention to detail, and ability to build a strong defense strategy.</p>
<p>From 2020 to 2024, I served as director of legal affairs and risk management at a major investment and construction holding. I supported deals worth hundreds of millions of rubles, drafted investment agreements, oversaw the corporate structure of group companies, and coordinated with banks and developers. My job was to eliminate legal errors and build a transparent, secure investment framework.</p>
<p>Today I run my own private practice as a sole proprietor. This gives me the flexibility to adapt to each client's specific needs and to give full attention to every detail.</p>
<ul>
<li><strong>support of real estate transactions, including purchase and sale agreements, leases, mortgages, assignments, and investment agreements;</strong></li>
<li><strong>drafting and review of contracts of any complexity, including lease, service, loan, joint venture, and corporate agreements;</strong></li>
<li><strong>legal opinions on properties and transactions: title due diligence, risk identification, and recommendations for mitigation;</strong></li>
<li><strong>litigation in real estate, corporate relations, debt recovery, and disputes with developers and contractors;</strong></li>
<li><strong>corporate support: registration and amendment of company records, preparation of minutes and resolutions, and structuring of share deals.</strong></li>
</ul>
<p>I hold to a principle: a lawyer should be not just an executor, but a strategic partner. I always explain every possible course of action to the client, assess the risks, and recommend the best solution. I work honestly, study the documents in depth, identify weak points, and immediately propose practical steps to protect my client's interests.</p>
<p>Over the years I've built an extensive network of contacts: notaries, cadastral engineers, realtors, tax consultants. This helps me resolve matters faster and more comprehensively. I make sure to stay in touch: I answer questions in detail, explain every stage of the work, and keep the client informed of the case's progress.</p>
<p>My clients value me for my professionalism, reliability, and negotiation skills. I speak in plain language, because I believe a client should clearly understand what we're doing and why.</p>
<p>At the Kutafin Moscow State Law University, I additionally completed training in mediation and hold a mediator qualification. This lets me offer clients not only classic legal solutions but also effective out-of-court dispute resolution methods. Where relationships can be preserved and time saved, I apply mediation techniques; where necessary, I confidently defend interests in court.</p>"""

PROMO_RU = """<p><strong>Меня зовут Виктория Кезик, я юрист опытом работы более 18 лет в сфере недвижимости, корпоративного и инвестиционного права.</strong></p>
<p><strong>Образование:</strong><br>МГЮА имени Кутафина - Медиация<br>МГАВТ при Министерстве транспорта РФ</p>
<p>С 2008 года я ежедневно решаю задачи клиентов: от составления простых договоров до сопровождения многомиллионных инвестиционных проектов.</p>
<p>Работаю в Москве и МО, но готова подключаться к проектам по всей России и зарубежом. Возможна дистанционная работа с использованием ЭЦП и электронного документооборота.</p>
<p>Если вам нужен юрист, который не ограничится формальной проверкой бумаг, а действительно возьмет задачу и доведет её до результата, обращайтесь. Я стану вашим надежным партнером и помогу защитить интересы в любой ситуации.</p>"""

PROMO_EN = """<p><strong>My name is Victoria Kezik, I am a lawyer with over 18 years of experience in real estate, corporate and investment law.</strong></p>
<p><strong>Education:</strong><br>Kutafin Moscow State Law University — Mediation<br>Moscow State Academy of Water Transport under the Ministry of Transport of Russia</p>
<p>Since 2008, I have been solving clients' tasks every day: from drafting simple contracts to supporting multimillion-dollar investment projects.</p>
<p>I work in Moscow and the Moscow region, but I am ready to join projects across Russia and abroad. Remote work is possible using digital signatures and electronic document management.</p>
<p>If you need a lawyer who won't just formally check the paperwork, but will genuinely take on the task and see it through to a result, get in touch. I will become your reliable partner and help protect your interests in any situation.</p>"""


def upgrade() -> None:
    op.create_table(
        'about_content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('promo_ru', sa.Text(), nullable=False),
        sa.Column('promo_en', sa.Text(), nullable=False),
        sa.Column('full_ru', sa.Text(), nullable=False),
        sa.Column('full_en', sa.Text(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.CheckConstraint('id = 1', name='about_content_singleton'),
    )
    op.create_table(
        'about_revisions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('promo_ru', sa.Text(), nullable=False),
        sa.Column('promo_en', sa.Text(), nullable=False),
        sa.Column('full_ru', sa.Text(), nullable=False),
        sa.Column('full_en', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_about_revisions_id'), 'about_revisions', ['id'], unique=False)

    about_content = sa.table(
        'about_content',
        sa.column('id', sa.Integer),
        sa.column('promo_ru', sa.Text),
        sa.column('promo_en', sa.Text),
        sa.column('full_ru', sa.Text),
        sa.column('full_en', sa.Text),
    )
    op.bulk_insert(
        about_content,
        [
            {
                'id': 1,
                'promo_ru': PROMO_RU,
                'promo_en': PROMO_EN,
                'full_ru': FULL_RU,
                'full_en': FULL_EN,
            }
        ],
    )


def downgrade() -> None:
    op.drop_index(op.f('ix_about_revisions_id'), table_name='about_revisions')
    op.drop_table('about_revisions')
    op.drop_table('about_content')
