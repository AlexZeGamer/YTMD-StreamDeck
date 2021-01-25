class DislikeAction extends DefaultAction {
    destroy$ = new rxjs.Subject();
    disliked = false;

    onContextAppear(event) {
        Main.MUSICDATA.pipe(takeUntil(this.destroy$)).subscribe(data => {
            if (!data) {
                return;
            }
            const _disliked = data.player.likeStatus === 'DISLIKE';

            if (this.disliked !== _disliked) {
                this.disliked = _disliked;
                this.context.setState(this.disliked ? 0 : 1);
            }
        });
    }

    onContextDisappear(event) {
        this.destroy$.next();
    }

    onKeypressUp(event) {
        this.sendAction('track-thumbs-down')
    }
}
