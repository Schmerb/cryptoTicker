import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowCircleLeft,
  faCaretDown,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faDollarSign,
  faYenSign,
  faPoundSign,
  faEuroSign,
  faWonSign
} from '@fortawesome/free-solid-svg-icons'

export const ArrowLeftCircle = ({style, size}) => <FontAwesomeIcon style={style} color={'#B9D3E7'} icon={faArrowCircleLeft} size={size || '2x'} />

export const ArrowUp = ({style, size}) => <FontAwesomeIcon style={style} icon={faArrowUp} size={size || 'xs'} />
export const ArrowDown = ({style, size}) => <FontAwesomeIcon style={style} icon={faArrowDown} size={size || 'xs'} />
export const ArrowLeft = ({style, size, color}) => <FontAwesomeIcon style={style} color={color || 'black'} icon={faArrowLeft} size={size || 'xs'} />

export const CaretDown = ({style, size}) => <FontAwesomeIcon style={style} color={'#B9D3E7'} icon={faCaretDown} size={size || 'xs'} />

export const DollarSign = ({style, size}) => <FontAwesomeIcon style={style} icon={faDollarSign} size={size || 'xs'} />
export const PoundSign = ({style, size}) => <FontAwesomeIcon style={style} icon={faPoundSign} size={size || 'xs'} />
export const EuroSign = ({style, size}) => <FontAwesomeIcon style={style} icon={faEuroSign} size={size || 'xs'} />
export const YenSign = ({style, size}) => <FontAwesomeIcon style={style} icon={faYenSign} size={size || 'xs'} />
export const WonSign = ({style, size}) => <FontAwesomeIcon style={style} icon={faWonSign} size={size || 'xs'} />

export const currencies = {
  'USD': DollarSign,
  'GBP': PoundSign,
  'EUR': EuroSign,
  'JPY': YenSign,
  'KRW': WonSign
}
