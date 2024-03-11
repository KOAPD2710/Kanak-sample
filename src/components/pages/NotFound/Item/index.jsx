import cn from 'clsx';

function Item({clone ,className, ...props}) {

    function renderClones(numberOfClones) {
        const clones = [];
        for (let i = 0; i < numberOfClones; i++) {
            clones.push(
                <div className={cn("item", className)}>
                    {props.image1}
                    {props.image2}
                    {props.image3}
                    {props.image4}
                    {props.image5}
                    {props.mainItem}
                </div>
            );
        }
        return clones;
    };

    return (
        <>
            {renderClones(clone)}
        </>
    )
}

export default Item