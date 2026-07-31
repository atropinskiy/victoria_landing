"use client"

import type { Locale } from "@/shared/i18n"
import type { Localized } from "@/widgets/test/ui/mockTest"

import { useLocale } from "next-intl"
import { useMemo, useState } from "react"

import { MOCK_TEST } from "@/widgets/test/ui/mockTest"
import { Button } from "@/shared/ui/button"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"
import { Typography } from "@/shared/ui/typography"

const SUBMIT_LABEL: Localized = { ru: "Отправить результаты", en: "Submit results" }

export interface TestAnswer {
  questionId: string
  optionId: string
}

export function BusinessPartnerTest() {
  const locale = useLocale() as Locale
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const totalQuestions = useMemo(
    () => MOCK_TEST.sections.reduce((acc, section) => acc + section.questions.length, 0),
    []
  )

  const questionNumbers = useMemo(() => {
    const numbers = new Map<string, number>()
    let order = 0

    MOCK_TEST.sections.forEach((section) => {
      section.questions.forEach((question) => {
        order += 1
        numbers.set(question.id, order)
      })
    })

    return numbers
  }, [])

  const isComplete = Object.keys(answers).length === totalQuestions

  function handleSubmit() {
    const payload: TestAnswer[] = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId,
    }))
    return payload
  }

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <div className="flex flex-col gap-14">
      <Typography as="h1" variant="h1" color="burgundy" className="text-center">
        {MOCK_TEST.title[locale]}
      </Typography>

      {MOCK_TEST.sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-8">
          <Typography as="h3" variant="h3" color="burgundy">
            {section.title[locale]}
          </Typography>

          {section.questions.map((question) => {
            return (
              <div
                key={question.id}
                className="border-border flex flex-col gap-4 border-b-3 border-dashed pb-4"
              >
                <Typography variant="bodyLg" className="font-normal">
                  {questionNumbers.get(question.id)}. {question.text[locale]}
                </Typography>

                <RadioGroup
                  aria-label={question.text[locale]}
                  value={answers[question.id] ?? ""}
                  onValueChange={(value: string) => handleAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      htmlFor={option.id}
                      className="flex w-fit cursor-pointer items-center gap-2.5"
                    >
                      <RadioGroupItem id={option.id} value={option.id} />
                      <Typography>{option.text[locale]}</Typography>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )
          })}
        </div>
      ))}

      <Button
        type="button"
        size="lg"
        disabled={!isComplete}
        onClick={handleSubmit}
        className="self-center"
      >
        {SUBMIT_LABEL[locale]}
      </Button>
    </div>
  )
}
