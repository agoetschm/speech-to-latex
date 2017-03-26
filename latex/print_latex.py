import os
import subprocess


def print_latex(expression, dest):
    content = r'''\documentclass{article}
    \thispagestyle{empty}
    \begin{document}

    $''' + expression + '''$

    \end{document}
    '''

    with open(dest + '.tex', 'w') as f:
        f.write(content)

    cmd = ['pdflatex', '-interaction', 'nonstopmode', dest + '.tex']
    proc = subprocess.Popen(cmd)
    proc.communicate()

    retcode = proc.returncode
    if not retcode == 0:
        os.unlink(dest + '.pdf')
        raise ValueError('Error {} executing command: {}'.format(retcode, ' '.join(cmd)))

    os.unlink(dest + '.tex')
    os.unlink(dest + '.log')
    os.unlink(dest + '.aux')

    cmd = ['pdfcrop', dest + '.pdf']
    proc = subprocess.Popen(cmd)
    proc.communicate()

    cmd = ['pdftoppm', '-png', dest + '-crop.pdf', dest]
    proc = subprocess.Popen(cmd)
    proc.communicate()
