/*
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
*/
type Bit = 0 | 1

type And<T extends Bit, U extends Bit> = T extends 1 ? (U extends 1 ? 1 : 0) : 0
type Or<T extends Bit, U extends Bit> = T extends 1 ? 1 : U extends 1 ? 1 : 0
type Xor<T extends Bit, U extends Bit> = T extends 1
  ? U extends 0
    ? 1
    : 0
  : U extends 1
  ? T extends 0
    ? 1
    : 0
  : 0

type FullAdder<T extends Bit, U extends Bit, C extends Bit = 0> = [
  Xor<Xor<T, U>, C>,
  Or<And<Xor<T, U>, C>, And<T, U>>
]
type FullAdder4Bits<
  B1 extends Bit,
  B2 extends Bit,
  B3 extends Bit,
  B4 extends Bit,
  B5 extends Bit,
  B6 extends Bit,
  B7 extends Bit,
  B8 extends Bit
> = [
  FullAdder<B1, B5, 0>[0],
  FullAdder<B2, B6, FullAdder<B1, B5>[1]>[0],
  FullAdder<B3, B7, FullAdder<B2, B6, FullAdder<B1, B5>[1]>[1]>[0],
  FullAdder<
    B4,
    B8,
    FullAdder<B3, B7, FullAdder<B2, B6, FullAdder<B1, B5>[1]>[1]>[1]
  >[0]
]

                                   // most significant bit is on the right
type result = FullAdder4Bits<1, 1, 0, 0 /**/, 1, 1, 0, 0>
