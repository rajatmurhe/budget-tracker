from flask import Flask, render_template, request, redirect

app = Flask(__name__)
transactions = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        desc = request.form["desc"]
        try:
            amount = float(request.form["amount"])
        except ValueError:
            return redirect("/")  # skip invalid entries

        transactions.append({"desc": desc, "amount": amount})
        return redirect("/")

    balance = sum(tx["amount"] for tx in transactions)
    return render_template("index.html", transactions=transactions, balance=balance)

@app.route("/delete/<int:index>")
def delete(index):
    if 0 <= index < len(transactions):
        transactions.pop(index)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
