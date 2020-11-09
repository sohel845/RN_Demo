export function getTestIdProps (id) {
    // TODO: strip in PROD builds
    return { accessible: true, accessibilityLabel: id, testID: id }
}
