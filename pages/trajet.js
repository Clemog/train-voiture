import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Engine from 'publicodes'
import publicodesRules from '../src/utils/publicodesRules'
import useSituation from '../src/hooks/useSituation'

export default function Trajet(props) {
  const engine = new Engine(props.rules)
  const { situation, setSituation } = useSituation(engine)

  const carEvaluation = engine.evaluate('trajet voiture . coût trajet')
  const trainEvaluation = engine.evaluate('trajet train . coût trajet')

  const carQuestions = Object.entries(engine.publicParsedRules)
    .filter((rule) => rule[1].rawNode.question !== undefined)
    .filter(
      (question) =>
        carEvaluation.missingVariables[question[0]] ||
        (situation && situation[question[0]]) ||
        situation[question[0]] === 0
    )

  const trainQuestions = Object.entries(engine.publicParsedRules)
    .filter((rule) => rule[1].rawNode.question !== undefined)
    .filter(
      (question) =>
        trainEvaluation.missingVariables[question[0]] ||
        (situation && situation[question[0]]) ||
        situation[question[0]] === 0
    )

  return (
    <main>
      <h1>Combien coûte réellement un trajet en voiture ?</h1>
      <h2>
        <Link href="/">Retourner à l'accueil</Link>
      </h2>
      <h2>Trajet: Nantes-Orléans</h2>
      <div>
        <h3>En voiture</h3>
        <ul>
          {carQuestions.map((rule) => (
            <li key={rule[0]}>{rule[1].rawNode.question}</li>
          ))}
        </ul>
        <div>Coût trajet voiture: {carEvaluation.nodeValue}</div>
      </div>
      <div>
        <h3>En train</h3>
        <ul>
          {trainQuestions.map((rule) => (
            <li key={rule[0]}>{rule[1].rawNode.question}</li>
          ))}
        </ul>
        <div>Coût trajet train: {trainEvaluation.nodeValue}</div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const { baseRules, engine } = publicodesRules()
  return {
    props: {
      titre: 'Les règles',
      rules: baseRules,
      // engine: JSON.parse(JSON.stringify(engine)),
    },
  }
}
