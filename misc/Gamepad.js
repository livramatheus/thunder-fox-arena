gameControl
    .on('connect', gamepad => {
        if (gamepad.buttons === 12) {
            gamepad.before(
                'up', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'w' : 'ArrowUp' }
                ))
            ).after(
                'up', () => window.dispatchEvent(new KeyboardEvent(
                    'keyup', { 'key': gamepad.id === 0 ? 'w' : 'ArrowUp' }
                ))
            );
            gamepad.before(
                'down', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 's' : 'ArrowDown' }
                ))
            ).after(
                'down', () => window.dispatchEvent(new KeyboardEvent(
                    'keyup', { 'key': gamepad.id === 0 ? 's' : 'ArrowDown' }
                ))
            );
            gamepad.before(
                'left', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'a' : 'ArrowLeft' }
                ))
            ).after(
                'left', () => window.dispatchEvent(new KeyboardEvent(
                    'keyup', { 'key': gamepad.id === 0 ? 'a' : 'ArrowLeft' }
                ))
            );
            gamepad.before(
                'right', () => window.dispatchEvent(
                    new KeyboardEvent('keydown', { 'key': gamepad.id === 0 ? 'd' : 'ArrowRight' })
                )
            ).after(
                'right', () => window.dispatchEvent(
                    new KeyboardEvent('keyup', { 'key': gamepad.id === 0 ? 'd' : 'ArrowRight' })
                )
            );
            gamepad.before(
                'start', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? ' ' : 'Enter' }
                ))
            );
            gamepad.before(
                'button0', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'f' : 'u' }
                ))
            );
            gamepad.before(
                'button1', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'g' : 'i' }
                ))
            );
            gamepad.before(
                'button2', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'h' : 'o' }
                ))
            );
            gamepad.before(
                'button3', () => window.dispatchEvent(new KeyboardEvent(
                    'keydown', { 'key': gamepad.id === 0 ? 'j' : 'p' }
                ))
            );
        }
    });