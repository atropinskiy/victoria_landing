interface ServiceStage {
  titleKey: string
  itemKeys: readonly string[]
}

interface ServiceApproach {
  titleKey?: string
  textKey: string
  noteKey?: string
}

interface ServiceWho {
  titleKey: string
  textKey: string
}

export interface Service {
  titleKey: string
  approach?: ServiceApproach
  stages: readonly ServiceStage[]
  who?: ServiceWho
}

export const SERVICES: readonly Service[] = [
  {
    titleKey: "servicePartnershipTitle",
    approach: {
      titleKey: "servicePartnershipApproachTitle",
      textKey: "servicePartnershipApproachText",
    },
    stages: [
      {
        titleKey: "servicePartnershipStage1Title",
        itemKeys: ["servicePartnershipStage1Item1", "servicePartnershipStage1Item2"],
      },
      {
        titleKey: "servicePartnershipStage2Title",
        itemKeys: ["servicePartnershipStage2Item1", "servicePartnershipStage2Item2"],
      },
      {
        titleKey: "servicePartnershipStage3Title",
        itemKeys: ["servicePartnershipStage3Item1", "servicePartnershipStage3Item2"],
      },
    ],
    who: { titleKey: "servicePartnershipWhoTitle", textKey: "servicePartnershipWhoText" },
  },
  {
    titleKey: "serviceDivorceTitle",
    approach: {
      titleKey: "serviceDivorceApproachTitle",
      textKey: "serviceDivorceApproachText",
    },
    stages: [
      {
        titleKey: "serviceDivorceStage1Title",
        itemKeys: ["serviceDivorceStage1Item1", "serviceDivorceStage1Item2"],
      },
      { titleKey: "serviceDivorceStage2Title", itemKeys: ["serviceDivorceStage2Item1"] },
      {
        titleKey: "serviceDivorceStage3Title",
        itemKeys: ["serviceDivorceStage3Item1", "serviceDivorceStage3Item2"],
      },
    ],
  },
  {
    titleKey: "serviceMediationTitle",
    approach: {
      titleKey: "serviceMediationApproachTitle",
      textKey: "serviceMediationApproachText",
    },
    stages: [
      {
        titleKey: "serviceMediationStage1Title",
        itemKeys: ["serviceMediationStage1Item1", "serviceMediationStage1Item2"],
      },
      {
        titleKey: "serviceMediationStage2Title",
        itemKeys: ["serviceMediationStage2Item1", "serviceMediationStage2Item2"],
      },
      { titleKey: "serviceMediationStage3Title", itemKeys: ["serviceMediationStage3Item1"] },
      { titleKey: "serviceMediationStage4Title", itemKeys: ["serviceMediationStage4Item1"] },
      { titleKey: "serviceMediationStage5Title", itemKeys: ["serviceMediationStage5Item1"] },
    ],
  },
  {
    titleKey: "serviceRealtyTitle",
    approach: {
      textKey: "serviceRealtyApproachText",
      noteKey: "serviceRealtyApproachNote",
    },
    stages: [
      {
        titleKey: "serviceRealtyStage1Title",
        itemKeys: ["serviceRealtyStage1Item1", "serviceRealtyStage1Item2"],
      },
      {
        titleKey: "serviceRealtyStage2Title",
        itemKeys: ["serviceRealtyStage2Item1", "serviceRealtyStage2Item2"],
      },
      {
        titleKey: "serviceRealtyStage3Title",
        itemKeys: ["serviceRealtyStage3Item1", "serviceRealtyStage3Item2"],
      },
    ],
  },
]
