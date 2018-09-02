import styled from 'react-emotion'

const BarBackground = styled('div')`
  display: flex;
  align-items: stretch;
  height: 62px;
  border-top: 2px solid ${props => props.theme.accentColor};
  box-shadow: 0 2px 6px 0 #e3e3e3;
`

export default BarBackground
