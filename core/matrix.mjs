/**
 * Generate a linear space divided into equidistant parts
 * @param {Number} start start of the linear space
 * @param {Number} stop end of the linear space
 * @param {Number} count amount of times to divide the space into
 * @returns Array going from start -> stop
 */
export function linspace(start, stop, count = 10) {
    const inc = (stop - start) / (count - 1)
    return Array(count).fill(start).forEach(
        (value, index) => value + index * inc
    )
}

/**
 * generate a matrix by applying two x and y vectors
 * @param {(x:T, y:T)=>U} functor function to apply on values
 * @param {Array<T>} vector_x vector x dimension
 * @param {Array<T>} vector_y vector y dimension
 * 
 * @returns {Array<Array<U>>} matrix
 */
export const apply2d = (functor, vector_x, vector_y) => vector_x.map(x => vector_y.map(y => functor(x, y)))

/**
 * transform a matrix given a function
 * @param {(v:T)=>void} functor 
 * @param {Array<Array<T>>} matrix 
 */
export const foreach2d = (functor, matrix) => matrix.forEach(vec => vec.forEach(functor))


/**
 * transform a matrix given a function
 * @param {(v:T)=>U} functor transformation function
 * @param {Array<Array<T>>} matrix matrix to be transformed
 * 
 * @returns {Array<Array<U>>} transformed matrix
 */
export const map2d = (functor, matrix) => matrix.map(vec => vec.map(functor))



