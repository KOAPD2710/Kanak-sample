import { useRef, useState, useId, Fragment } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedText = ({ children, el: Wrapper = "div", className, once, type = 'word', transition, ...props }) => {
    const textArray = Array.isArray(children) ? children : [children];
    const [isEnd, setIsEnd] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: .4, once });
    const defaultAnim = {
        hidden: { y: '100%' },
        visible: { y: 0 },
    }
    const transitionDefault = {
        // ease: [0, 0.71, 0.2, 1.01],
        duration: 2,
        staggerChildren: .05
    }

    return (
        <Wrapper {...props} className={className}>
            <span className="sr-only">{children}</span>
            <motion.span
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={transition || transitionDefault}
                onAnimationComplete={() => console.log("complete")}
                aria-hidden
            >
                {type === 'char' ?
                    (<>
                        {textArray.map((line) => (
                            <span key={useId()} className="split-line">
                                {line.split(" ").map((word) => (
                                    <span key={useId()} className="inline-block">
                                        {word.split("").map((char) => (
                                            <motion.span
                                                key={useId()}
                                                className="inline-block"
                                                variants={defaultAnim}>
                                                {char}
                                            </motion.span>
                                        ))}
                                        <span className="inline-block">&nbsp;</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </>) :
                    (<>
                        {textArray.map((line) => (
                            <span key={useId()} className="split-line">
                                {line.split(" ").map((word) => (
                                    <Fragment key={useId()}>
                                        <motion.span
                                            className="inline-block"
                                            variants={defaultAnim}>
                                            {word}
                                        </motion.span>
                                        <span className="inline-block">&nbsp;</span>
                                    </Fragment>
                                ))}
                            </span>
                        ))}
                    </>
                )}
            </motion.span>
        </Wrapper>
    )
}

export default AnimatedText;