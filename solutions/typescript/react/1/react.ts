//
// Delete and replace stub with your own implementation
//
// Inspired by "How it Works":
// https://indepth.dev/posts/1269/finding-fine-grained-reactive-programming#how-it-works
// https://levelup.gitconnected.com/finding-fine-grained-reactive-programming-89741994ddee?source=friends_link&sk=31c66a70c1dce7dd5f3f4229423ad127#4543
//
// and "Computations":
// https://github.com/ryansolid/solid/blob/master/documentation/reactivity.md#user-content-computations
//

/**
 * Type for the closure's value equality predicate.
 *
 * @typeParam T - Type of the values being compared for
 *              equality.
 *
 * @remarks
 * Conceptually this function should be equivalent
 * to: `lhs === rhs`
 *
 * @param lhs   - left hand side value
 * @param rhs   - right hand side value
 * @returns     - `true` if values are considered
 *                equal; `false` otherwise.
 */
type EqualFn<T> = (lhs: T, rhs: T) => boolean;
type GetterFn<T> = () => T;
type SetterFn<T> = (value: T) => T;
type UnsubscribeFn = () => void;
type UpdateFn<T> = (value?: T) => T;

type InputPair<T> = [GetterFn<T>, SetterFn<T>];

type Options = {
  name: string; // for debugging
};

type ObserverR = {
  name?: string;
};

type ObserverV<T> = {
  value?: T;
  strict?: boolean;
  equalFn?: EqualFn<T>;
  updateFn: UpdateFn<T>;
};

type Observer<T> = ObserverR & ObserverV<T>;

type SubjectR = {
  name?: string;
  observers: Array<ObserverR> | undefined;
};

type SubjectV<T> = {
  value: T;
  equalFn?: EqualFn<T>;
};

type Subject<T> = SubjectR & SubjectV<T>;

// module Context value
let activeObservers: Array<Observer<unknown>> = [];
let activeCallback: Array<Observer<unknown>> = [];

function updateObserver<T>(observer: Observer<T>): void {
  activeObservers.push(observer as Observer<unknown>);
  observer.value = observer.updateFn(observer.value);
}

function updateCallback<T>(observer: Observer<T>): void {
  activeCallback.push(observer as Observer<unknown>);
  observer.value = observer.updateFn(observer.value);
}

function removeCallback(name: string): void {
  if (!name) {
    return;
  }
  activeCallback = activeCallback.filter((observer) => observer?.name !== name);
}

/**
 * Creates an input closure. The value is accessed
 * via the accessor and changed via the
 * mutator returned as part an `InputPair<T>`.
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the return
 *                value of the accessor and the type
 *                of the mutator's single argument.
 *
 * @param value   - Input closure's initial value.
 * @param equal   - By default the current and previous
 *                values are not compared so invoking
 *                the mutator with identical values
 *                will trigger updates on any
 *                subscribers. When `true` is
 *                specified the
 *                {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                is used to compare values and
 *                mutations with unchanging values
 *                **are** suppressed.
 *                When `T` is a structural type
 *                it is necessary to provide a
 *                `(a: T, b: T) => boolean` comparison
 *                predicate instead.
 * @param options - Holder object for relevant options.
 *                Assigning a `name` to a subject can
 *                be useful during debugging.
 * @returns       - An `InputPair<T>`. The 1st
 *                element is the accessor (getter
 *                function), the 2nd element is
 *                the mutator (setter function).
 */
function createInput<T>(
  value: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): InputPair<T> {
  // Clear data
  // Because the text suite does not take code from class but directly from the file
  // The static variable that we used would be overlapped
  activeCallback = [];
  activeObservers = [];

  const s: Subject<T> = {
    name: options?.name,
    observers: undefined,
    value,
    equalFn: undefined,
  };

  const read: GetterFn<T> = () => {
    // if (activeObservers) s.observer = activeObservers;
    return s.value;
  };

  const write: SetterFn<T> = (newValue: T) => {
    s.value = newValue;
    if (activeObservers.length > 0) {
      let needCallback = true;

      activeObservers.forEach((observer) => {
        if (
          (observer.strict &&
            observer.value === observer.updateFn(observer.value)) ||
          (observer.equalFn &&
            observer.equalFn(observer.value, observer.updateFn(observer.value)))
        ) {
          needCallback = false;
        }
        observer.value = observer.updateFn(observer.value);
      });

      if (needCallback && activeCallback.length > 0) {
        activeCallback.forEach((observer) => {
          observer.value = observer.updateFn(observer.value);
        });
      }
    }
    return s.value;
  };

  return [read, write];
}

/**
 * Creates a computed (derived) closure with the
 * supplied function which computes the current value
 * of the closure.
 *
 * @privateRemarks
 * `Observer<T>` may be good enough to get through
 * the enabled test case but more is needed to
 * get further ...
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the value
 *                returned by the update function and
 *                of the value
 *                accepted by the function.
 *
 * @param updateFn - Update function. This function
 *                 references one or more accessors of
 *                 other subjects. It **should not**
 *                 perform side effects. It is expected
 *                 to return a value which will be the
 *                 value of the closure until the next
 *                 update. The closure's value is
 *                 supplied to this update function
 *                 on the next update.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for the
 *                 first time.
 * @param equal    - By default the current and previous
 *                 values are not compared so updates
 *                 will be triggered even if the value
 *                 doesn't _change_. When `true` is
 *                 specified the
 *                 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                 is used to compare values and updates
 *                 with identical values **are**
 *                 suppressed. When `T` is a structural
 *                 type it is necessary to provide a
 *                 `(a: T, b: T) => boolean` comparison
 *                 predicate instead.
 * @param options  - Holder object for relevant options.
 *                 Assigning a `name` to a subject can
 *                 be useful during debugging.
 * @returns        - The accessor to the closure's
 *                 value (getter function). Retrieves
 *                 the closure's current value. Used by
 *                 observers (or more accurately their
 *                 update function) to obtain the
 *                 value (and to subscribe for
 *                 updates).
 */
function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  const o: Observer<T> = {
    name: options?.name,
    value,
    updateFn,
  };

  if (_equal) {
    if (typeof _equal === 'boolean') {
      o.strict = true;
    } else {
      o.equalFn = _equal;
    }
  }

  updateObserver(o);
  return (): T => o.value!;
}

/**
 * Creates a callback closure with the supplied
 * function which is expected to perform side effects.
 *
 * @privateRemarks
 * `observer` isn't mean't to be an empty object literal.
 * Replace it with something more appropriate to its
 * purpose.
 *
 * @typeParam T    - Type of the closure's value.
 *                 By extension the type of the value
 *                 returned by the callback function
 *                 and of the value accepted by the
 *                 function.
 *
 * @param updateFn - Callback function. This function
 *                 references one or more accessors of
 *                 subjects. It may perform side effects.
 *                 It will also be passed the
 *                 value that it returned the last time it
 *                 was invoked.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for
 *                  the first time.
 * @returns        - The `unsubscribe` function. Once
 *                 invoked the callback closure will
 *                 stop receiving updates from the
 *                 subjects it subscribed to.
 */
function createCallback<T>(_updateFn: UpdateFn<T>, _value?: T): UnsubscribeFn {
  const observer: Observer<T> = {
    name: (new Date().getTime() * Math.random()).toString(),
    value: _value,
    updateFn: _updateFn,
  };
  updateCallback(observer);
  return (): void => {
    if (!observer?.name) {
      return;
    }
    removeCallback(observer.name);
  };
}

export { createInput, createComputed, createCallback };