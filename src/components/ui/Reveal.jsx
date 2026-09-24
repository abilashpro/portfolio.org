import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-reveal wrapper. Fades, un-blurs and slides content up once when it
 * enters the viewport. Respects the user's reduced-motion preference.
 */
export default function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      // Drop the filter once done: a lingering filter breaks descendants' backdrop-blur.
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
