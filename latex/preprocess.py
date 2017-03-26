

def preprocess(expression):

    expression = str(expression)

    latex_cmds = [
        ('integral', '\int'),
        # TODO
        ('sum', '\sum')
    ]

    for src, dst in latex_cmds:
        expression = expression.replace(src, dst)

    return expression