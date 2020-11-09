import renderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'

import CardContainer from '../card-container'
import Card from '../../card/card'
import CircleProgressBar from '../../circle-progress-bar/circle-progress-bar'
import Badge, { BADGE_SIZE } from '../../badge/badge'
import { createThemedMockStore } from '../../../helpers'
import { DEVICE_VARIANT } from '../../../../redux/device'

describe('Card Component', () => {
    beforeEach(() => {
        emptyStore = createThemedMockStore(DEVICE_VARIANT.PHONE_PORTRAIT)
    })

    const createElement = (props) => {
        return renderer.create(<Provider {...{ store: emptyStore }} ><CardContainer {...props}>
            <Card
                numColumns={1}
                label={'Label'}
                progressBar={<CircleProgressBar
                    percent={80}
                    radius={40} />}
                badge={<Badge size={BADGE_SIZE.L} content={'1'} />}
                fixHeight={true}
                text={'Since 11:45'} />
        </CardContainer></Provider>)
    }

    it('renders correctly', () => {
        const element = createElement()
        expect(element.toJSON()).toMatchSnapshot()
    })
})

