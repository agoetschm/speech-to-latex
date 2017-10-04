def preprocess(expression):
    expression = str(expression)

    latex_cmds = [  # TODO
        ('integral', '\\int'),
        ('fraction', '\\frac{'),
        ('over', '}{'),
        ('done', '}'),
        ('squared', '^2'),
        ('power of', '^'),
        ('one', '1'),
        ('two', '2'),
        ('three', '3'),
        ('four', '4'),
        ('five', '5'),
        ('six', '6'),
        ('seven', '7'),
        ('eight', '8'),
        ('nine', '9'),
        ('ten', '10'),
        ('eleven', '11'),
        ('twelve', '12'),
        ('vector', '\\vec{'),
        ('paragraph', '\\paragraph{'),
        ('section', '\section{'),
        ('subsection', '\\subsection{'),
        ('times', '\\times'),
        ('plus', '+'),
        ('minus', '-'),
        ('begin cases', '\\begin{cases}'),
        ('end cases', '\\end{cases}'),
        ('theta', '\\theta'),
        ('bullet', '\\bullet'),
        ('square root of', '\\sqrt{'),
        ('equals', '='),
        ('divides', '\\div'),
        ('underscore', '_'),
        ('new page', '\\newpage'),
        ('less than', '<'),
        ('greater than', '>'),
        ('sum', '\\sum')]

    for src, dst in latex_cmds:
        expression = expression.replace(src, dst)


    return expression
