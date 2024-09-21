describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Unspecified operation"});
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operation: foobar"});
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: undefined"});
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2-1"});
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2.1"});
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -21});
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -42});
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -2.5});
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
    });

    describe('Arithmetic', function () {
        describe('Validation', function () {

            it('rejects missing operand2', function (done) {
                request.get('/arithmetic?operation=add&operand1=4')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: "Invalid operand2: undefined" });
                        done();
                    });
            });

            it('rejects missing operand1', function (done) {
                request.get('/arithmetic?operation=add&operand2=4')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                        done();
                    });
            });

            it('validates addition operation with two valid integer operands', function (done) {
                request.get('/arithmetic?operation=add&operand1=5&operand2=7')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 12 });
                        done();
                    });
            });

            it('validates subtraction operation with two valid decimal operands', function (done) {
                request.get('/arithmetic?operation=subtract&operand1=10.5&operand2=3.2')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 7.3 });
                        done();
                    });
            });

            it('rejects missing operand2 for division', function (done) {
                request.get('/arithmetic?operation=divide&operand1=10')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: "Invalid operand2: undefined" });
                        done();
                    });
            });

            it('rejects malformed operand1 for multiplication', function (done) {
                request.get('/arithmetic?operation=multiply&operand1=5x&operand2=3')
                    .expect(400)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ error: "Invalid operand1: 5x" });
                        done();
                    });
            });
        });

        describe('Addition', function () {
            it('adds two positive integers', function (done) {
                request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 42 });
                        done();
                    });
            });
            it('adds zero to an integer', function (done) {
                request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 42 });
                        done();
                    });
            });
            it('adds a negative integer to a positive integer', function (done) {
                request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: -21 });
                        done();
                    });
            });
            it('adds two negative integers', function (done) {
                request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: -42 });
                        done();
                    });
            });
            it('adds an integer to a floating point number', function (done) {
                request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: -2.5 });
                        done();
                    });
            });
            it('adds with negative exponent', function (done) {
                request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.eql({ result: 0 });
                        done();
                    });
            });
        });

    });

});
