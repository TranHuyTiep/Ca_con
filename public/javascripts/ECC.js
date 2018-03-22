
curve = {
    name:'secp256k1',
    p:bigInt('ffffffff00000001000000000000000000000000ffffffffffffffffffffffff',base=16),
    a:bigInt(-3),
    b: bigInt('5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b',base=16),
    SEED : bigInt('bd71344799d5c7fcdc45b59fa3b9ab8f6a948bc5',base=16),
    c : bigInt('5b056c7e11dd68f40469ee7f3c7a7d74f7d121116506d031218291fb',base=16),
    X:bigInt('6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296',base=16),
    Y:bigInt('4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5',base=16),
    n:bigInt('ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551',base=16),
    h:1,
}

/**
 * n^e module p
 * @param n
 * @param e
 * @param p
 * @returns {*}
 */
function tinh_luy_thua(n,e,p){
    var n = bigInt(n)
    var e = bigInt(e)
    var p = bigInt(p)
    var result = n.modPow(e, p)
    return result
}

/**
 * phep chia da thuc trong GF(2)
 # c(x) = a(x)*b(x) mod q(x)
 # a(x) = a[1]x + a[0] and b(x) = b[1]x + b[0]
 # q(x) = x^2 + q[1]x + q[0]
 * @param a
 * @param b
 * @param q
 * @param p
 */

function division(a,b,q,p){
    // console.log(a)
    // console.log(b)
    // console.log(q)
    var t0 = (a[0].multiply(b[0])).mod(p)
    var t1 = (a[0].multiply( b[1] ).add( a[1].multiply(b[0]))).mod(p)
    var t2 = (a[1].multiply(b[1])).mod(p)
    var c1 = (t1.subtract(q[1].multiply(t2))).mod(p)
    var c0 = (t0.subtract(q[0].multiply(t2))).mod(p)
    return [c0,c1]
}

/**
 * F(x)^e module q(x) in GF(2)
 # q(x) = x**2 − bx + c
 # c(x) := x^e mod (x^2 − bx + c) = c1*x + c0
 # x^e = (x + 0)*(0x + 1)=>a=(1,0),b=(0,1)
 # q(-b,c)
 * @param e
 * @param a
 * @param q
 * @param p
 * @returns {*|Array|[number,number]}
 */
function tinh_luy_thua_F(e,a,q,p){
    var result = [bigInt('1'),bigInt('0')]
    var sq = a
    // console.log(result)
    while (e.eq(0)==false){
        if(e.mod(2).eq(1)){
            result = division(a,result,q,p)
            e = (e.subtract(1))
        }
        a = division(a, a, q, p)
        e = e.divide(2)

    }
    return result
}

/**
 * Cipolla-Lehmer square root algorithm
 # h := (b^2 − 4c)^(p−1)/2(mod p)
 * @param c
 * @param b
 * @param p
 * @returns {*}
 * @constructor
 */
function CL(c, b, p){
    var h = (b.multiply(b).subtract(c.multiply(4))).mod(p)
    var h1 = tinh_luy_thua(h, (p.subtract(1)).divide(2),p)
    var s = bigInt('1')
    if(h1.eq(1) || h1.eq(0)){
        s = bigInt('0')
    }
    b = ((b).multiply(-1)).mod(p)
    c = c.mod(p)
    var q = [c,b]
    var e = (p.add(1)).divide(2)
    var a = [bigInt('0'),bigInt('1')]
    var y = tinh_luy_thua_F(e,a,q,p)
    return (s.multiply( y[0]))
}

/**
 * a prime p where p > 2, a quadratic residue c in GF(p) and an integer
 # b where 0 < b < p
 * @param c
 * @param p
 * @returns {*}
 */
function can_bac_hai(c,p) {
    var b = 100
    var t = bigInt('0')
    c = c.mod(p)
    for(var i=0;i<b;i++){
        var y = CL(c, (bigInt(i + 1).mod(p)), p)
        var t1 = (y.multiply(y)).mod(p)
        if (t1.eq(c)){
            t = y
            break
        }
    }
    if(t.gt(0)){
        return (t)
    }else {
        return (t.add(p))
    }
}



// var p = bigInt('115792089210356248762697446949407573530086143415290314195533631308867097853951')
// var c = bigInt('54482837085503842457913951049488513539071978307250707216928124062793075562515')
// var t = can_bac_hai(c,p)
//
// console.log(t.toString())
//

/**
 *
 * @param k
 * @param p
 */
function inverse_mod(k, p) {
    k =  bigInt(k)
    p =  bigInt(p)
    return k.modInv(p)
}
// console.log(inverse_mod(8,11))


/**
 * y^2 = x^3 +ax + b
 * """Returns True if the given point lies on the elliptic curve."""
 * check point
 * @param point
 */
function is_on_curve(point) {
    if(point.length==null){
        return true
    }
    var x = bigInt(point[0])
    var y = bigInt(point[1])
    result = y.pow(2)
        .subtract(x .pow(3))
        .subtract(x.multiply(curve.a))
        .subtract(curve.b)
        .mod(curve.p);
    return result==0
}


/**
 *
 * @param point
 */
function point_neg(point){
    if (point.length ==2){
        var x = bigInt(point[0])
        var y = bigInt(point[1])
        if(y.isNegative()){
            y = y.multiply(-1)
        }
        var templ =  [x,(y).mod(curve.p)]
        if(is_on_curve(templ)){
            return templ
        }else {
            return false
        }
    }else {
        return null
    }
}


/**
 * tong  diem
 * @param point1
 * @param point2
 * @returns {*}
 */
function  add_point(point1,point2) {


    if(point1==null){
        return point2
    }
    if(point2==null) {
        return point1
    }

    if(is_on_curve(point1)==false || is_on_curve(point2)==false){
        return false
    }

    var x1 = point1[0]
    var y1 = point1[1]
    var x2 = point2[0]
    var y2 = point2[1]

    if((x1.eq(x2)==true) && (y1.eq(y2)==false)){
        return None
    }

    if((x1==x2) && (y1==y2)){
        var a = x1.pow(2).multiply(3).add(curve.a)
        var b = y1.multiply(2)
        var m = a.multiply(inverse_mod(b, curve.p))
    }else{
        a = y2.subtract(y1)
        b = x2.subtract(x1)
        m = a.multiply(inverse_mod(b,curve.p))
    }

    var x = m.pow(2).subtract(x1).subtract(x2)
    var y = m.multiply((x1.subtract(x))).subtract(y1)
    if (is_on_curve((x,y))){
        var y_t = y.mod(curve.p)
        if(y_t.lt(0)){
            return [x.mod(curve.p),curve.p.add(y_t)]
        }else {
            return [x.mod(curve.p),y_t]
        }
    }else {
        return null
    }
}


/**
 * tong cua k diem
 * @param k
 * @param point
 * @returns {*}
 */
function scalar_mult(k, point){
    var k = bigInt(k)
    if(is_on_curve(point)==false){
        return null
    }

    if(k.mod(curve.n).eq(0) == true || point.length!=2){
        return None
    }

    if(k<0){
        scalar_mult(-k,point_neg(point))
    }
    var resul = null
    var templ = point

    while (k.eq(0)==false){
        if(k.mod(2)==1){
            resul = add_point(resul,templ)
        }
        templ = add_point(templ, templ)

        k=k.shiftRight(1);

    }
    // return result

    if(is_on_curve(resul)) {
        return resul

    }else {
        return null
    }

}

/**
 * tao khoa
 * @returns {*} {public_key,private_key}
 */
function make_keypair(k){
    var private_key = bigInt('')
    var public_key = [bigInt('')]
    private_key = bigInt.randBetween(0,curve.n)
    if(k){
        private_key = bigInt(k)
    }
    public_key = scalar_mult(private_key,[curve.X,curve.Y])

    if (public_key[1].mod(2).eq(0)){
        return {private_key:private_key.toString(),public_key:public_key[0].multiply(10).toString()};
    }else{
        return {private_key:private_key.toString(),public_key:public_key[0].multiply(10).add(1).toString()};
    }
}



/**
 * x to point public_key
 * @param x
 * @returns {[null,null]} Point(x,y)
 */
function x_to_Point(x){
    x = bigInt(x)
    var check = x.mod(10)
    var x = x.divide(10)
    var Y = (x.pow(3).add(x.multiply(curve.a)).add(curve.b)).mod(curve.p)
    var y = can_bac_hai(Y,curve.p)
    if(y.mod(2).eq(check)){
        return [x,y]
    }else {
        return [x,curve.p.subtract(y)]
    }

}

/**
 * tinh Key
 * @param private_key
 * @param cert
 * @returns {[null,null,null]}
 */

function create_key_to_cert(private_key,cert) {
    var P = bigInt(cert.P), id = cert.id,s = bigInt(cert.s)
    P = x_to_Point(P)
    var public_key_CA = x_to_Point(bigInt(cert.C))
    var a = P[0].toString()
    a = a + id

    var mes_hash = CryptoJS.SHA256(a).toString(CryptoJS.enc.Hex)
    var hash_P_i = bigInt(mes_hash,base=16)
    var b = (hash_P_i.multiply(private_key).add(s)).mod(curve.n)
    var B = add_point(public_key_CA, scalar_mult(hash_P_i, P))
    var check = scalar_mult(b,[curve.X,curve.Y])
    if (B[1].mod(2).eq(0)){
        return [b, B[0].multiply(10), check[0].eq(B[0])];
    }else{
        return [b, B[0].multiply(10).add(1), check[0].eq(B[0])];
    }

}