"use client"

import type { Test, TestAnswerItem, TestResult } from "@/entities/test"
import type { Locale } from "@/shared/i18n"

import { useLocale, useTranslations } from "next-intl"
import { useMemo, useState } from "react"

import { TestResultChart, useTestSubmit } from "@/entities/test"
import { Button } from "@/shared/ui/button"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"
import { Typography } from "@/shared/ui/typography"
import { Modal } from "@/shared/ui/widgets"

export function BusinessPartnerTest({ test }: { test: Test }) {
  const t = useTranslations("test")
  const locale = useLocale() as Locale
  const [answers, setAnswers] = useState<TestAnswerItem[]>([])
  const [result, setResult] = useState<TestResult | null>(null)

  const { mutateAsync: submitTest, isPending } = useTestSubmit()

  const totalQuestions = useMemo(
    () => test?.sections.reduce((acc, section) => acc + section.questions.length, 0),
    []
  )

  const questionNumbers = useMemo(() => {
    const numbers = new Map<number, number>()
    let order = 0

    test?.sections.forEach((section) => {
      section.questions.forEach((question) => {
        order += 1
        numbers.set(question.id, order)
      })
    })

    return numbers
  }, [])

  const isComplete = answers.length === totalQuestions

  function handleSubmit() {
    submitTest({ answers }).then((data) => setResult(data ?? null))
  }

  function handleAnswerChange(questionId: number, value: string) {
    setAnswers((prev) => [
      ...prev.filter((answer) => answer.question_id !== questionId),
      { question_id: questionId, option_id: Number(value) },
    ])
  }

  return (
    <div className="flex flex-col gap-14">
      <Typography as="h1" variant="h1" color="burgundy" className="text-center">
        {test.title[locale]}
      </Typography>

      {test.sections.map((section) => (
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
                  value={String(
                    answers.find((answer) => answer.question_id === question.id)?.option_id ?? ""
                  )}
                  onValueChange={(value: string) => handleAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      htmlFor={String(option.id)}
                      className="flex w-fit cursor-pointer items-center gap-2.5"
                    >
                      <RadioGroupItem id={String(option.id)} value={String(option.id)} />
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
        disabled={!isComplete || isPending}
        onClick={handleSubmit}
        className="self-center"
      >
        {t("submit")}
      </Button>

      <Modal
        open={!!result}
        onClose={() => setResult(null)}
        title={t("resultTitle")}
        className="sm:max-w-lg"
      >
        {result && <TestResultChart scores={result.scores} />}
      </Modal>
    </div>
  )
}
