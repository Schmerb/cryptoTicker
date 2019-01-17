import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowCircleLeft,
  faCaretDown,
  faArrowUp,
  faArrowDown,
  faDollarSign,
  faYenSign,
  faPoundSign,
  faEuroSign,
  faWonSign
} from '@fortawesome/free-solid-svg-icons'

export const ArrowLeftCircle = (style) => <FontAwesomeIcon style={style} color={'#B9D3E7'} icon={faArrowCircleLeft} size='2x' />

export const ArrowUp = (style) => <FontAwesomeIcon style={style} icon={faArrowUp} size='xs' />
export const ArrowDown = (style) => <FontAwesomeIcon style={style} icon={faArrowDown} size='xs' />

export const CaretDown = (style) => <FontAwesomeIcon style={style} color={'#B9D3E7'} icon={faCaretDown} size='xs' />

export const DollarSign = (style) => <FontAwesomeIcon style={style} icon={faDollarSign} size='xs' />
export const PoundSign = (style) => <FontAwesomeIcon style={style} icon={faPoundSign} size='xs' />
export const EuroSign = (style) => <FontAwesomeIcon style={style} icon={faEuroSign} size='xs' />
export const YenSign = (style) => <FontAwesomeIcon style={style} icon={faYenSign} size='xs' />
export const WonSign = (style) => <FontAwesomeIcon style={style} icon={faWonSign} size='xs' />

export const currencies = {
  'USD': DollarSign,
  'GBP': PoundSign,
  'EUR': EuroSign,
  'JPY': YenSign,
  'KRW': WonSign
}
