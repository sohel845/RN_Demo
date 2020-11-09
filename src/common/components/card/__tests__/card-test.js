import renderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'

import Card from '../card'
import CircleProgressBar from '../../circle-progress-bar/circle-progress-bar'
import Badge, { BADGE_SIZE } from '../../badge/badge'
import { createThemedMockStore } from '../../../helpers'
import { DEVICE_VARIANT } from '../../../../redux/device'

describe('Card Component', () => {
    beforeEach(() => {
        emptyStore = createThemedMockStore(DEVICE_VARIANT.PHONE_PORTRAIT)
    })

    const createElement = (props) => {
        return renderer.create(<Provider {...{ store: emptyStore }} ><Card
            progressBar={<CircleProgressBar
                percent={80}
                radius={40} />}
            badge={<Badge size={BADGE_SIZE.L} content={'1'} />}
            {...props} /></Provider>)
    }

    it('renders correctly', () => {
        const props = {
            numColumns: 1,
            label: 'Label',
            fixHeight: true,
            badge: <Badge size={BADGE_SIZE.L} content={'1'} />,
            text: 'Since 11:45'
        }
        const element = createElement(props)
        expect(element.toJSON()).toMatchSnapshot()
    })

    it('label and text shown correctly', () => {
        const props = {
            label: 'Label',
            text: 'Since 11:45'
        }
        const element = createElement(props)

        // renders label
        expect(element.root.findAllByType('Text')[0].props.children).toBe(props.label)

        // renders text
        expect(element.root.findAllByType('Text')[1].props.children).toBe(props.text)
    })
})
