/** 
 */




var func = function() {
    alert(1);
}


var expect  = require('chai').expect,
    add     = require('./add'),
    should  = require('should');


describe('this is the add function: ', function() {
    it('1 + 1 = 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });

    it('1 + 2 = 3', function() {
        expect(add(1, 2)).to.be.equal(3);
    });

    it('1 + 4 = 5', function() {
        (add(1, 4) === 5).should.be.true;
    });
});