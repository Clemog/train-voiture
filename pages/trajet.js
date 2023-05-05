import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Engine from 'publicodes'
import publicodesRules from '../src/utils/publicodesRules'
import useSituation from '../src/hooks/useSituation'
import Question from '../src/components/Question'
import NumberInput from '../src/components/question/NumberInput'

import { serializeUnit } from 'publicodes'
import { roundValue } from '../src/utils/utils'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

export default function Trajet(props) {
  const engine = new Engine(props.rules)
  const { situation, setSituation } = useSituation(engine)

  const carEvaluation = engine.evaluate(
    'trajet voiture . coût trajet par personne'
  )
  const trainEvaluation = engine.evaluate('trajet train . coût trajet total')

  const carQuestions = carEvaluation.traversedVariables.reduce((acc, rule) => {
    const ruleRawNode = engine.publicParsedRules[rule]?.rawNode
    if (
      ruleRawNode?.question &&
      !Object.keys(ruleRawNode).includes('injecté')
    ) {
      acc.push([rule, engine.publicParsedRules[rule]])
    }
    return acc
  }, [])

  const trainQuestions = trainEvaluation.traversedVariables.reduce(
    (acc, rule) => {
      const ruleRawNode = engine.publicParsedRules[rule]?.rawNode
      if (
        ruleRawNode?.question &&
        !Object.keys(ruleRawNode).includes('injecté')
      ) {
        acc.push([rule, engine.publicParsedRules[rule]])
      }
      return acc
    },
    []
  )
  console.log(trainQuestions)
  const voyageursEvaluation = engine.evaluate('trajet . voyageurs')

  return (
    <main>
      <h1>Combien coûte réellement un trajet en voiture ?</h1>
      <h2>
        <Link href="/">Retourner à l'accueil</Link>
      </h2>
      <h2>Trajet: Nantes-Orléans</h2>
      <Question
        name={'trajet . voyageurs'}
        rule={engine.publicParsedRules['trajet . voyageurs']}
        evaluation={voyageursEvaluation}
        value={voyageursEvaluation.nodeValue}
        onChange={setSituation}
      />
      <Wrapper>
        <div>
          <h3>En voiture</h3>
          <p>
            <b>
              Coût trajet voiture par personne:{' '}
              {roundValue(carEvaluation.nodeValue)}
              <span>{serializeUnit(carEvaluation.unit)}</span>
            </b>
          </p>
          <p>
            Coût trajet voiture total:{' '}
            {roundValue(
              engine.evaluate('trajet voiture . coût trajet').nodeValue
            )}
            <span>
              {serializeUnit(
                engine.evaluate('trajet voiture . coût trajet').unit
              )}
            </span>
          </p>
          <ul>
            {carQuestions.map((rule) => (
              <li key={rule[0]}>
                <Question
                  name={rule[0]}
                  rule={rule[1]}
                  evaluation={engine.evaluate(rule[1].dottedName)}
                  value={engine.evaluate(rule[1].dottedName).nodeValue}
                  onChange={setSituation}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>En train</h3>
          <p>
            <b>
              Coût trajet train par personne:{' '}
              {roundValue(
                engine.evaluate('trajet train . coût trajet').nodeValue
              )}
              <span>
                {serializeUnit(
                  engine.evaluate('trajet train . coût trajet').unit
                )}
              </span>
            </b>
          </p>
          <p>
            Coût trajet train total: {roundValue(trainEvaluation.nodeValue)}
            <span>{serializeUnit(trainEvaluation.unit)}</span>
          </p>
          <ul>
            {trainQuestions.map((rule) => (
              <li key={rule[0]}>
                <Question
                  name={rule[0]}
                  rule={rule[1]}
                  evaluation={engine.evaluate(rule[1].dottedName)}
                  value={engine.evaluate(rule[1].dottedName).nodeValue}
                  onChange={setSituation}
                />
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
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
