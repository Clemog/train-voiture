import { useMemo } from 'react'
import ChoicesInput from './question/ChoicesInput'
import NumberInput from './question/NumberInput'
import styled from 'styled-components'

const QuestionTitle = styled.div`
  margin-bottom: 1rem;
`

export default function Question(props) {
  const type = useMemo(() => {
    if (
      props.evaluation.unit === undefined &&
      (props.rule.rawNode.type === 'booléen' ||
        props.rule.rawNode.type === undefined) &&
      typeof props.evaluation.nodeValue !== 'number'
    ) {
      return 'choices'
    }
    return 'number'
  }, [props.evaluation, props.rule])

  return (
    <div>
      <QuestionTitle>{props.rule.rawNode.question}</QuestionTitle>
      {type === 'choices' ? (
        <ChoicesInput
          rule={props.rule}
          evaluation={props.evaluation}
          value={props.value || ''}
          onChange={props.onChange}
        />
      ) : (
        <NumberInput
          rule={props.rule}
          evaluation={props.evaluation}
          value={props.value || ''}
          onChange={props.onChange}
        />
      )}
    </div>
  )
}
